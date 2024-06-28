from fastapi import APIRouter, Response
from authlib.integrations.starlette_client import OAuth, OAuthError
from fastapi.responses import HTMLResponse, RedirectResponse
from starlette.config import Config
from starlette.requests import Request

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

@router.get("/login", tags=["auth"])
async def login(request: Request):
    redirect_uri = request.url_for('auth')
    print(redirect_uri)
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get('/auth',tags=['auth'])
async def auth(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError as error:
        return HTMLResponse(f'<h1>{error.error}</h1>')
    user = token.get('userinfo')
    if user:
        print("SET USER")
        request.session['user'] = dict(user)
    return RedirectResponse(url=config('FRONTEND_URL'))

@router.get('/logout')
async def logout(request: Request):
    request.session.clear()
    return {'message': 'Logged Out'}

@router.get("/check-auth")
async def logout(request: Request):
    print(request.session.get('user'))
    return "user" in request.session