from starlette.config import Config
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langchain.tools import BaseTool, StructuredTool, tool
import uuid

memory = MemorySaver()


def create_conversation(system_message, temperature=1, topP=1):
    return uuid.uuid4()


def respond_to_message(message, system_message, temperature=1, topP=1):
    llm = create_model(temperature, topP)
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
        print(s)


def create_model(temperature, topP):
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
    graph = create_react_agent(model, [search], checkpointer=memory)
    return graph


@tool
def search(query: str) -> str:
    """Return information about this application author"""
    return "LangChain"
