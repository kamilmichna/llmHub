from backend.database import Base
from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String, func
from sqlalchemy.orm import relationship


class Agent(Base): 
    __tablename__ = 'agents'
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=False)
    system_message = Column(String, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="agents")
    created = Column(DateTime(timezone=True), server_default=func.now())