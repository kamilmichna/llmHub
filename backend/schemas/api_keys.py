from pydantic import BaseModel

from backend.schemas.agent import PROVIDERS

class ApiKeyBase(BaseModel):
    id: int
    alias: str
    hash: str
    provider: PROVIDERS
    
class ApiKey(BaseModel):
    alias: str
    hash: str
    provider: PROVIDERS
    
class ApiKeyCreate(BaseModel):
    alias: str
    key: str
    provider: PROVIDERS
