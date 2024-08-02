from sqlalchemy import delete
from sqlalchemy.orm import Session
from backend.models.agent import Agent as AgentModel
from backend.schemas.agent import AgentCreate

def create_agent(db: Session, agent: AgentCreate, user_id: int):
    db_agent = AgentModel(provider=agent.provider, name=agent.name, system_message=agent.system_message, owner_id=user_id)
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)
    return db_agent

def get_agent_by_name(db: Session, name: int, user_id: int): 
    return db.query(AgentModel).filter(AgentModel.name == name and AgentModel.owner_id == user_id).first()

def get_agents(db: Session,user_id: int, skip: int = 0, limit: int = 100):
    return db.query(AgentModel).filter(AgentModel.owner_id == user_id).offset(skip).limit(limit).all()

def delete_agent_by_name(db: Session, name: int, user_id: int): 
    agent = db.query(AgentModel).filter(AgentModel.name == name and AgentModel.owner_id == user_id).first()
    if not agent:
        raise Exception("no agent found!")
    db.delete(agent)
    db.commit()