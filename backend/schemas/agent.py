from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime
from backend.models.agent import PROVIDERS_ENUM

PROVIDERS = Literal['OpenAI', 'Groq']

class AgentBase(BaseModel):
    id: int
    name: str
    provider: PROVIDERS
    created: datetime

class AgentCreate(BaseModel):
    name: str
    provider: PROVIDERS
    system_message: Optional[str] = None

class AgentInvoke(BaseModel):
    message: str

class Agent(AgentBase):
    name: str
    provider: PROVIDERS
    system_message: Optional[str] = None
    class Config:
        from_attributes = True