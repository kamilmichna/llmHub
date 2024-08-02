from sqlalchemy.orm import Session
from backend.schemas.api_keys import ApiKey, ApiKeyCreate
from backend.models.api_key import ApiKey as ApiKeyModel

def create_api_key(db: Session, api_key: ApiKeyCreate, user_id: int):
    if len(api_key.key) == 0:
        raise Exception('Api key must be provided!')
    api_key_obj = ApiKeyModel(provider=api_key.provider, alias=api_key.alias, hash=api_key.key, owner_id=user_id)
    db.add(api_key_obj)
    db.commit()
    db.refresh(api_key_obj)
    return api_key_obj