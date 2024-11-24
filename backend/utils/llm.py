from starlette.config import Config
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langchain.tools import tool
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import uuid

base_system_message = "You are a helpful rag agent."


def get_api_key():
    config = Config(".env")
    api_key = config("OPENAI_API_KEY")
    return api_key


conversations = {}

embeddings_model = OpenAIEmbeddings(api_key=get_api_key())


def create_conversation(user_id, agent_name):
    conversation_uuid = str(uuid.uuid4())
    conversations[conversation_uuid] = {
        "memory_saver": MemorySaver(),
        "user_id": user_id,
        "files": create_vector_store(),
        "agent_name": agent_name,
    }
    return conversation_uuid


def get_conversation(uuid):
    try:
        return conversations[uuid]
    except Exception as e:
        print(e)


def close_conversation(user_id, uuid):
    if uuid in conversations:
        if conversations[uuid].get("user_id") is user_id:
            del conversations[uuid]
            return uuid


def respond_to_message(
    message, system_message, converstaion_uuid, temperature=1, topP=1
):
    conversation = get_conversation(converstaion_uuid)
    retriever = conversation.get("files").as_retriever()
    llm = create_model(temperature, topP, conversation.get("memory_saver"), retriever)
    res = llm.stream(
        {
            "messages": [
                SystemMessage(content=base_system_message),
                SystemMessage(content=system_message or ""),
                HumanMessage(content=message),
            ]
        },
        config={"configurable": {"thread_id": "1"}},
    )
    return generate_res_stream(res)


def generate_res_stream(stream):
    for s in stream:
        if "agent" in s:
            yield s["agent"]["messages"][-1].content
        if "tools" in s:
            yield f'Calling Tool with name: {s["tools"]["messages"][-1].name}...'


def create_model(temperature, topP, memory_saver: MemorySaver, retriever):

    model = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=temperature,
        top_p=topP,
        max_tokens=None,
        timeout=None,
        max_retries=2,
        api_key=get_api_key(),
    )
    tools = create_toolset(retriever)
    graph = create_react_agent(model, tools, checkpointer=memory_saver)
    return graph


def save_files_for_conversation(converstaion_uuid, user_id, file_path):
    conversation = get_conversation(converstaion_uuid)
    if conversation.get("user_id") is user_id:
        vector_store = conversation.get("files")
        if vector_store:
            splitted_docs = load_pdf_file(file_path)
            add_docs_to_vector_store(splitted_docs, vector_store)


def create_toolset(retriever):
    @tool
    def search(query: str) -> str:
        """Return information about application author. Only use this tool when directly asked about it."""
        return "Author of this application is Kamil Michna. The application is the practical part of his engineering work. If you want to see his other projects, visit github.com/kamilmichna"

    def rag(query: str) -> str:
        """Return information in files uploaded by user."""
        print("RAG RAG RAG")
        print(retriever.invoke(query))
        return retriever.invoke(query)

    return [search, rag]


def create_vector_store():
    vector_store = InMemoryVectorStore(embeddings_model)
    return vector_store


def add_docs_to_vector_store(documents, vector_store: InMemoryVectorStore):
    vector_store.add_documents(documents)


def load_pdf_file(file_path):
    loader = PyPDFLoader(file_path)
    docs = loader.load()
    return split_docs(docs)


def split_docs(documents):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splitted_docs = text_splitter.split_documents(documents)
    return splitted_docs
