from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import (
    create_todo,
    fetch_all_todos,
    fetch_one_todo,
    delete_todo,
    update_todo,
)

from models import Todo

app = FastAPI()


origin = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:5173",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/api/todo")
async def get_todo():
    response = await fetch_all_todos()
    return response


@app.get("/api/todo/{title}", response_model=Todo)
async def get_todo_by_id(title):
    response = await fetch_one_todo(title)
    if not response:
        raise HTTPException(status_code=404, detail="No todo found for this title.")
    else:
        return response


@app.post("/api/todo", response_model=Todo)
async def post_todo(todo: Todo):
    response = await create_todo(todo.dict())
    if not response:
        raise HTTPException(
            status_code=404, detail="Something went wrong / Bad request"
        )
    else:
        return response


@app.put("/api/todo/{title}", response_model=Todo)
async def put_todo(title: str, desc: str):
    response = await update_todo(title, desc)
    if not response:
        raise HTTPException(
            status_code=404, detail="Something went wrong / Bad request"
        )
    else:
        return response


@app.delete("/api/todo/{title}")
async def remove_todo(title):
    response = await delete_todo(title)
    if not response:
        raise HTTPException(
            status_code=404, detail="Something went wrong / Bad request"
        )
    else:
        return "Successfully deleted Todo"
