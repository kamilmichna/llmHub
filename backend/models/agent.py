from backend.database import Base
from sqlalchemy import Boolean, Column, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.orm import relationship

PROVIDERS_ENUM = {"OPENAI", "GROQ"}

class Agent(Base): 
    __tablename__ = 'agents'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=False)
    provider = Column(Enum(*PROVIDERS_ENUM))
    system_message = Column(String, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="agents")