from sqlalchemy import Column, Enum, ForeignKey, Integer, String, Text
from backend.database import Base
from sqlalchemy.orm import relationship

PROVIDERS_ENUM = {"OpenAI", "Groq"}

class ApiKey(Base): 
    __tablename__ = 'api_keys'
    id = Column(Integer, primary_key=True)
    alias = Column(String, unique=False)
    provider = Column(Enum(*PROVIDERS_ENUM))
    hash = Column(Text, unique=False)
    owner = relationship("User", back_populates="api_keys")
    owner_id = Column(Integer, ForeignKey("users.id"))