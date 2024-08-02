from backend.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
class User(Base): 
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)

    agents = relationship("Agent", back_populates="owner")
    api_keys = relationship("ApiKey", back_populates="owner")
