from sqlalchemy.orm import Session
from backend.models.agent import Agent as AgentModel
from backend.schemas.agent import AgentCreate

def create_agent(db: Session, agent: AgentCreate, user_id: int):
    db_agent = AgentModel(provider=agent.provider, name=agent.name, system_message=None, owner_id=user_id)
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)
    return db_agent

def get_agent(db: Session, agent_id: int, user_id: int): 
    return db.query(AgentModel).filter(AgentModel.id == agent_id and AgentModel.owner_id == user_id).first()

def get_agents(db: Session,user_id: int, skip: int = 0, limit: int = 100):
    return db.query(AgentModel).filter(AgentModel.owner_id == user_id).offset(skip).limit(limit).all()