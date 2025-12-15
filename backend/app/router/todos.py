from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import verify_firebase_token
from app.models import Todo
from app.schemas import TodoCreate, TodoResponse, TodoUpdate
from fastapi import HTTPException


router = APIRouter()

# CREATES a to do item for a user
#--------------------------------------------------------------
@router.post("/todos")
def create_todo(todo: TodoCreate, db: Session = Depends(get_db), user_id: str = Depends(verify_firebase_token)):
    new_item = Todo(text=todo.text, user_id=user_id)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

# GET all items for a user
#--------------------------------------------------------------
@router.get("/todos")
def get_todos(db: Session = Depends(get_db), user_id: str = Depends(verify_firebase_token)):
    return db.query(Todo).filter(Todo.user_id == user_id).all()


# DELETE item for user
#--------------------------------------------------------------
@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db), user_id: str = Depends(verify_firebase_token)):
    todo = db.query(Todo).filter(Todo.id == todo_id, Todo.user_id == user_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(todo)
    db.commit()
    return {"message": "Item deleted"}


# PUT to update item completion status
#--------------------------------------------------------------
@router.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, todo: TodoUpdate, db: Session = Depends(get_db), user_id: str = Depends(verify_firebase_token)):
    db_item = db.query(Todo).filter(Todo.id == todo_id, Todo.user_id == user_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db_item.completed = todo.completed
    db.commit()
    db.refresh(db_item)
    return db_item


