from models import Todo


# mongo driver
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")
database = client.TodoList
collection = database.todo


async def fetch_one_todo(title):
    document = collection.find_one({"title": title})
    return document


async def fetch_all_todos():
    todos = []
    cursor = collection.find({})
    async for doc in cursor:
        todos.append(Todo(**doc))
    return todos


async def create_todo(todo):
    result = await collection.insert_one(todo)
    return result


async def update_todo(title, description):
    await collection.update_one(
        {"title": title}, {"$set": {"description": description}}
    )

    document = await collection.find_one({"title": title})
    return document


async def delete_todo(title):
    await collection.delete_one({"title": title})
    return True
