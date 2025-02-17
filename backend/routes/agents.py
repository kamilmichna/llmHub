from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from fastapi.responses import StreamingResponse
from backend.database import get_db
from backend.orm.agent_orm import (
    create_agent,
    delete_agent_by_name,
    get_agent_by_name,
    get_agents,
)
from backend.routes.auth import get_current_user
from backend.schemas.agent import AgentBase, AgentCreate, Agent, AgentInvoke
from sqlalchemy.orm import Session

from backend.utils.llm import (
    close_conversation,
    create_conversation,
    respond_to_message,
    save_files_for_conversation,
)
from backend.utils.file_upload import get_file_upload_directory_path, save_file_to_disk

router = APIRouter()


@router.post("/agents", tags=["agents"], response_model=Agent)
async def create(
    model: AgentCreate, db: Session = Depends(get_db), user_id=Depends(get_current_user)
):
    try:
        existing_agent = get_agent_by_name(db, name=model.name, user_id=user_id)
        if existing_agent is not None:
            raise Exception("User with this username already exists!")
        agent = create_agent(db, model, user_id)
        return agent
    except Exception as e:
        db.rollback()
        print(e)
        raise HTTPException(status_code=400, detail="Cannot create agent!")


@router.get("/agents", tags=["agents"], response_model=list[Agent])
def list_agents(db: Session = Depends(get_db), user_id=Depends(get_current_user)):
    try:
        agents = get_agents(db, user_id)
        return agents
    except Exception as e:
        db.rollback()
        print(e)
        raise HTTPException(status_code=400, detail="Cannot get agents list")


@router.get("/agents/{agent_name}", tags=["agents"], response_model=Agent)
def get_agent_details(
    agent_name, db: Session = Depends(get_db), user_id=Depends(get_current_user)
):
    try:
        agent = get_agent_by_name(db, agent_name, user_id)
        return agent
    except Exception as e:
        db.rollback()
        print(e)
        raise HTTPException(status_code=400, detail="Cannot get agent details")


@router.delete("/agents/{agent_name}", tags=["agents"], status_code=status.HTTP_200_OK)
def get_agent_details(
    agent_name, db: Session = Depends(get_db), user_id=Depends(get_current_user)
):
    try:
        delete_agent_by_name(db, agent_name, user_id)
    except Exception as e:
        db.rollback()
        print(e)
        raise HTTPException(status_code=400, detail="Cannot delete agent")


@router.post("/agents/{agent_name}", tags=["agents"])
def agent_on_message(
    agent_name,
    payload: AgentInvoke,
    db: Session = Depends(get_db),
    user_id=Depends(get_current_user),
):
    existing_agent = get_agent_by_name(db, name=agent_name, user_id=user_id)
    if existing_agent is None:
        raise Exception("Agent with this name don`t exist")
    return StreamingResponse(
        respond_to_message(
            payload.message,
            existing_agent.system_message,
            converstaion_uuid=payload.conversation_uuid,
            temperature=payload.temperature,
            topP=payload.topP,
        ),
        media_type="text/plain",
    )


@router.post(
    "/agents/{agent_name}/start", tags=["agents"], status_code=status.HTTP_200_OK
)
def agent_start_conversation(
    agent_name,
    user_id=Depends(get_current_user),
):
    try:
        return create_conversation(user_id, agent_name)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Cannot start conversation")


@router.post("/agents/{uuid}/close", tags=["agents"], status_code=status.HTTP_200_OK)
def agent_start_conversation(
    uuid,
    user_id=Depends(get_current_user),
):
    try:
        return close_conversation(user_id, uuid)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Cannot close conversation")


@router.post("/agents/{uuid}/addFile", tags=["agents"])
def upload_file(
    uuid,
    files: list[UploadFile],
    user_id=Depends(get_current_user),
):

    file_upload_dir = get_file_upload_directory_path()
    file_path = f"{file_upload_dir}{uuid}/{files[0].filename}"
    save_file_to_disk(file_path, files[0])
    save_files_for_conversation(uuid, user_id, file_path)
    return {"filenames": [file.filename for file in files]}
