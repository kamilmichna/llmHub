from fastapi import APIRouter, Depends, Response, HTTPException
from authlib.integrations.starlette_client import OAuth, OAuthError
from fastapi.responses import HTMLResponse, RedirectResponse
from starlette.config import Config
from starlette.requests import Request
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.orm.user_orm import create_user, get_user
from backend.schemas.user import UserCreate
config = Config('.env')  # read config from .env file
router = APIRouter()
oauth = OAuth(config)
oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile'
    }
)

def get_current_user(request: Request, db: Session = Depends(get_db)):
    if ("user" in request.session): 
        user_data = request.session.get('user')
        user_email = user_data['email']
        user_db_data = get_user(db, user_email)
        return getattr(user_db_data,'id', None)
    else: raise HTTPException(status_code=401)

@router.get("/login", tags=["auth"])
async def login(request: Request):
    redirect_uri = request.url_for('auth')
    print(redirect_uri)
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get('/auth',tags=['auth'])
async def auth(request: Request, db: Session = Depends(get_db)):
    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError as error:
        return HTMLResponse(f'<h1>{error.error}</h1>')
    user = token.get('userinfo')
    if user:
        userData = get_user(db, user.email)
        if userData is None:
            create_user(db, UserCreate(email=user.email))
        request.session['user'] = dict(user)
    return RedirectResponse(url=config('FRONTEND_URL'))


@router.get('/logout', dependencies=[Depends(get_current_user)])
async def logout(request: Request):
    request.session.clear()
    return {'message': 'Logged Out'}

@router.get("/check-auth")
async def logout(request: Request):
    return "user" in request.session