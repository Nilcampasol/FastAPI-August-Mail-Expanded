from fastapi import FastAPI, Request
from pydantic import BaseModel
from datetime import datetime
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pytz
from dictionary import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "API funcionando"}


@app.get("/notes")
def get_notes():
    return list_notes


@app.get("/notes/{note_id}", response_model=Note)
def get_note(note_id: int):
    note = notes.get(note_id)
    if note:
        return note
    raise HTTPException(status_code=404, detail="Note not found")


@app.get("/list-note/{list_note_id}")
def get_list_note(list_note_id: int):
    for list_note in list_notes:
        if list_note.id == list_note_id:
            return list_note
    raise HTTPException(status_code=404, detail="List Note not found")


@app.post("/tasks/{note_id}")
async def add_task(note_id: int, task_data: dict):
    note = notes.get(note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    new_task_id = max(note.task.keys(), default=0) + 1
    new_task = Task(
        id=new_task_id,
        description=task_data.get("description", ""),
        completed=task_data.get("completed", False),
        timer=task_data.get("timer", False)
    )
    note.task[new_task_id] = new_task

    for list_note in list_notes:
        if list_note.id == note_id:
            list_note.tasks_count += 1

    return new_task


@app.patch("/tasks/{note_id}/{task_id}/done")
async def update_task_done(note_id: int, task_id: int, request: Request):
    taskdone = await request.json()
    done = taskdone.get("done")
    note = notes.get(note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    task = note.task.get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.completed = done

    for list_note in list_notes:
        if list_note.id == note_id:
            list_note.tasks_done = sum(
                1 for t in note.task.values() if t.completed)
            break

    return {"success": True, "tasks_done": list_note.tasks_done}


@app.patch("/list-note/{list_note_id}/time")
async def update_note_time(list_note_id: int):
    list_note = next((ln for ln in list_notes if ln.id == list_note_id), None)
    if not list_note:
        raise HTTPException(status_code=404, detail="Note not found")
    this_date = datetime.now(pytz.timezone('Europe/Madrid')).ctime()
    actualtime = datetime.now(pytz.timezone('Europe/Madrid'))
    note = notes.get(list_note.id)
    note.last_edited = this_date
    for list_note in list_notes:
        if list_note.id == list_note_id:
            list_note.time = actualtime.strftime("%H:%M")
            break

    return {"success": True, "time": list_note.time}


@app.post("/notes/newNote")
async def create_note():

    new_id = len(notes) + 1
    notes[new_id] = Note(id=new_id,
                         title="New Note",
                         subtitle="Insert subtitle",
                         labels=get_labels_by_ids([1]),
                         content="Insert content",
                         link="Insert Link",
                         task={
                             1: Task(id=1, description="New Task", completed=False, timer=False)
                         },
                         img={
                             1: "/Frontend/img/Coffe-Shop.png"
                         },
                         last_edited=datetime.now(pytz.timezone('Europe/Madrid'))
                         )



    list_notes.append(note_to_listnote(notes[new_id]))

    return {"success": True, "note_id": new_id}
