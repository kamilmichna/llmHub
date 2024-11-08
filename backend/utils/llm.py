from starlette.config import Config
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langchain.tools import BaseTool, StructuredTool, tool
import uuid

conversations = {}


def create_conversation(user_id, agent_name):
    conversation_uuid = str(uuid.uuid4())
    conversations[conversation_uuid] = {
        "memory_saver": MemorySaver(),
        "user_id": user_id,
        "agent_name": agent_name,
    }
    return conversation_uuid


def get_conversation(uuid):
    print("CONVERSATIONS", conversations[uuid])
    try:
        print("USER ID", conversations[uuid].get("user_id"))
        return conversations[uuid]
    except Exception as e:
        print(e)


def close_conversation(uuid):
    if uuid in conversations:
        del conversations[uuid]


def respond_to_message(
    message, system_message, converstaion_uuid, temperature=1, topP=1
):
    print("GET CONVERSATION START !!!!")
    conversation = get_conversation(converstaion_uuid)
    llm = create_model(temperature, topP, conversation.get("memory_saver"))
    res = llm.stream(
        {
            "messages": [
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


def create_model(temperature, topP, memory_saver: MemorySaver):
    config = Config(".env")
    api_key = config("OPENAI_API_KEY")
    model = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=temperature,
        top_p=topP,
        max_tokens=None,
        timeout=None,
        max_retries=2,
        api_key=api_key,
    )
    graph = create_react_agent(model, [search], checkpointer=memory_saver)
    return graph


@tool
def search(query: str) -> str:
    """Return information about this application or author"""
    return "Author of this application is Kamil Michna. The application is the practical part of his engineering work. If you want to see his other projects, visit github.com/kamilmichna"
