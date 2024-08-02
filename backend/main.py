import json
from typing import Union

from fastapi.responses import HTMLResponse


from .routes import agents
from .routes import auth
from .routes import api_keys
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
from starlette.config import Config
from .database import engine
from .models.user import Base as UserBase
from .models.agent import Base as AgentBase
from .models.api_key import Base as ApiKeyBase
import uvicorn

UserBase.metadata.create_all(bind=engine)
AgentBase.metadata.create_all(bind=engine)
ApiKeyBase.metadata.create_all(bind=engine)

config = Config('.env')  # read config from .env file
app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=config('SECRET'))

origins = [
    "http://localhost:3000",
    config("FRONTEND_URL")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(agents.router)
app.include_router(api_keys.router)

@app.get('/')
async def homepage(request: Request):
    user = request.session.get('user')
    if user:
        data = json.dumps(user)
        html = (
            f'<pre>{data}</pre>'
            '<a href="/logout">logout</a>'
        )
        return HTMLResponse(html)
    return HTMLResponse('<a href="/login">login</a>')


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)