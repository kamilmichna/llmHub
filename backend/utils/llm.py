from langchain_groq import ChatGroq
def respond_to_message(message): 
    llm = create_model()
    res = llm.invoke([(
        "human",
        message
    )])
    return res


def create_model(): 
    return  ChatGroq(
    model="mixtral-8x7b-32768",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)