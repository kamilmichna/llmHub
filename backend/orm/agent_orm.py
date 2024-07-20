from sqlalchemy.orm import Session
from backend.models.agent import Agent as AgentModel
from backend.schemas.agent import AgentCreate

def create_agent(db: Session, agent: AgentCreate):
    db_agent = AgentModel(provider=agent.provider, name=agent.name, system_message=None)
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)
    return db_agent

def get_agent(db: Session, agent_email: str): 
    return db.query(AgentModel).filter(AgentModel.email == agent_email).first()