from pydantic import BaseModel
from typing import Optional, Literal
from backend.models.agent import PROVIDERS_ENUM

PROVIDERS = Literal['OPENAI', 'GROQ']

class AgentBase(BaseModel):
    name: str
    provider: PROVIDERS
    system_message: Optional[str] = None

class AgentCreate(AgentBase):
    name: str
    provider: PROVIDERS

class Agent(AgentBase):
    name: str
    provider: PROVIDERS
    system_message: Optional[str] = None
    class Config:
        orm_mode = True