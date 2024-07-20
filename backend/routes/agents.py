
from fastapi import APIRouter, Depends, HTTPException, Request
from backend.database import get_db
from backend.orm.agent_orm import create_agent
from backend.routes.auth import get_current_user
from backend.schemas.agent import AgentCreate, Agent
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/agents", tags=["auth"], response_model=Agent, dependencies=[Depends(get_current_user)])
async def create(model: AgentCreate, db: Session = Depends(get_db)):
    try:
        agent = create_agent(db, model)
        return agent
    except Exception as e:
        db.rollback();
        print(e)
        raise HTTPException(status_code=400, detail="Cannot create agent!")
