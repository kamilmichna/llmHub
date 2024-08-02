from fastapi import APIRouter, Depends, HTTPException
from requests import Session

from backend.database import get_db
from backend.routes.auth import get_current_user
from backend.schemas.api_keys import ApiKey, ApiKeyBase, ApiKeyCreate
from backend.orm.api_keys import create_api_key


router = APIRouter()

@router.post("/api-keys", tags=["api_keys"], response_model=ApiKeyBase)
async def create(model: ApiKeyCreate, db: Session = Depends(get_db), user_id = Depends(get_current_user)):
    try:
        api_key = create_api_key(db, model, user_id)
        return api_key
    except Exception as e:
        db.rollback();
        print(e)
        raise HTTPException(status_code=400, detail="Cannot create api key!")

@router.get("/api-keys", tags=["agents"])
async def getApiKeys(db: Session = Depends(get_db), user_id = Depends(get_current_user)):
    return