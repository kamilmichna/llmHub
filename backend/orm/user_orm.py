from sqlalchemy.orm import Session
from backend.schemas.user import UserCreate
from backend.models.user  import User as UserModel

def create_user(db: Session, user: UserCreate):
    db_user = UserModel(email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_email: str): 
    return db.query(UserModel).filter(UserModel.email == user_email).first()