from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AgentBase(BaseModel):
    id: int
    name: str


class AgentCreate(BaseModel):
    name: str
    system_message: Optional[str] = None


class AgentInvoke(BaseModel):
    message: str
    temperature: float
    topP: float
    conversation_uuid: Optional[str] = None


class Agent(AgentBase):
    name: str
    system_message: Optional[str] = None

    class Config:
        from_attributes = True
