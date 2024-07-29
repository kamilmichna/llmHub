from langchain_groq import ChatGroq
from starlette.config import Config
from langchain_core.messages import HumanMessage, SystemMessage

def respond_to_message(message, system_message): 
    llm = create_model()
    res = llm.invoke([
        SystemMessage(content=system_message or ''),
        HumanMessage(content=message)
    ])
    return res.content


def create_model():
    config = Config('.env')
    api_key=config('GROQ_API_KEY')
    return  ChatGroq(
        model="mixtral-8x7b-32768",
        temperature=0,
        max_tokens=None,
        timeout=None,
        max_retries=2,
        groq_api_key=api_key
    )