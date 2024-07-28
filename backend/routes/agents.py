
from fastapi import APIRouter, Depends, HTTPException, Request
from backend.database import get_db
from backend.orm.agent_orm import create_agent, get_agent, get_agents
from backend.routes.auth import get_current_user
from backend.schemas.agent import AgentBase, AgentCreate, Agent, AgentInvoke
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/agents", tags=["agents"], response_model=Agent)
async def create(model: AgentCreate, db: Session = Depends(get_db), user_id = Depends(get_current_user)):
    try:
        agent = create_agent(db, model, user_id)
        return agent
    except Exception as e:
        db.rollback();
        print(e)
        raise HTTPException(status_code=400, detail="Cannot create agent!")
    
@router.get("/agents", tags=["agents"], response_model=list[AgentBase])
def list_agents(db: Session = Depends(get_db), user_id = Depends(get_current_user)):
    try:
        agents = get_agents(db, user_id)
        return agents
    except Exception as e:
        db.rollback()
        print(e)
        raise HTTPException(status_code=400, detail="Cannot get agents list")

@router.get("/agents/{agent_id}", tags=["agents"], response_model=Agent)
def get_agent_details(agent_id, db: Session = Depends(get_db), user_id = Depends(get_current_user)):
    try:
        agents = get_agent(db, agent_id, user_id)
        return agents
    except Exception as e:
        db.rollback()
        print(e)
        raise HTTPException(status_code=400, detail="Cannot get agents list")
    
@router.post("/agents/{agent_name}", tags=["agents"])
def agent_on_message(agent_name, payload: AgentInvoke):
    # return respond_to_message()
    return payload.message