from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from fastapi import HTTPException
from typing import Dict, List
from fastapi.middleware.cors import CORSMiddleware

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


class Task(BaseModel):
    id: int
    description: str
    completed: bool
    timer: bool

class Label(BaseModel):
    id: int
    name: str
    css_string: str

class BaseNote(BaseModel):
    id: int
    title: str
    subtitle: str
    labels: list[Label]

class Note(BaseNote):
    content: str
    link: str
    task: dict[int, Task]
    img: dict[int, str]
    last_edited: datetime

class ListNote(BaseNote):
    tasks_done: int
    tasks_count: int
    img: str
    time: str
    has_timer: bool
    has_shared: bool
    has_link: bool

general_labels = [
    Label(id=1, name="Personal", css_string= "label-personal"),
    Label(id=2, name="Work", css_string="label-work"),
    Label(id=3, name="Ideas", css_string="label-ideas"),
    Label(id=4, name="Project", css_string="label-project"),
    Label(id=5, name="Team", css_string="label-team"),
    Label(id=6, name="Update", css_string="label-update")
]

def get_labels_by_ids(ids):
    return [label for label in general_labels if label.id in ids]

notes = {
    1: Note(
        id=1,
        labels=get_labels_by_ids([1, 2, 3]),
        title="Brainstorming Session Highlight on all the things i have no idea what i'm writing, this is a long title that should get truncated",
        subtitle="Capture your team's best ideas here, well if you want to do it.",
        content="This note contains a summary of our latest brainstorming session, focusing on creative solutions and new approaches.",
        link="https://example.com/brainstorming-session",
        task={
            1: Task(id=1, description="Review session notes", completed=True, timer=False),
            2: Task(id=2, description="Share with team", completed=True, timer=False),
            3: Task(id=3, description="Schedule follow-up meeting", completed=False, timer=False)
        },
        img={
            1: "/FrontEnd/img/Coffe-Shop.png", 
            2: "/FrontEnd/img/Reading-Zone-png.jpg"
        },
        last_edited=datetime(2025, 9, 12, 15, 20, 0)
    ),
    2: Note(
        id=2,
        labels=get_labels_by_ids([4, 2, 3]),
        title="Helping a local business",
        subtitle="Amet minim mollit non deserunt iluminated his shop poorly.",
        content="Discussed ways to support local shops, including marketing tips and community engagement.",
        link="https://example.com/local-business-support",
        task={
            1: Task(id=1, description="Create flyer", completed=False, timer=False),
            2: Task(id=2, description="Contact local shop owners", completed=False, timer=False),
            3: Task(id=3, description="Organize event", completed=False, timer=False)
        },
        img={
            1: "/FrontEnd/img/Modern-interior-Home.png",
            2: "/FrontEnd/img/Reading-Zone-png.jpg"
        },
        last_edited=datetime(2025, 9, 11, 11, 24, 0)
    ),
    3: Note(
        id=3,
        labels=get_labels_by_ids([5, 6]),
        title="Weekly Team Update",
        subtitle="Document this week's accomplishments, challenges, and next steps. I don't think you want to read what we hadn't done due to time constraints.",
        content="This week, the team completed the initial project phase and outlined goals for the upcoming sprint.",
        link="https://example.com/team-update",
        task={
            1: Task(id=1, description="Send weekly email", completed=False, timer=False),
            2: Task(id=2, description="Update project board", completed=False, timer=False),
            3: Task(id=3, description="Plan next sprint", completed=False, timer=False)
        },
        img={
            1: "/FrontEnd/img/Reading-Zone-png.jpg",
            2: "/FrontEnd/img/Modern-interior-Home.png"
        },
        last_edited=datetime(2025, 9, 10, 9, 2, 0)
    ),
    4: Note(
        id=4,
        labels=get_labels_by_ids([1]),
        title="Streamline Your Workflow with These Tips",
        subtitle="In today's fast-paced environment we are going to do nothing :/",
        content="Learn how to streamline your workflow, prioritize tasks, and collaborate effectively with your team.",
        link="https://example.com/workflow-tips",
        task={
            1: Task(id=1, description="Read article", completed=False, timer=False),
            2: Task(id=2, description="Apply one tip", completed=False, timer=False),
            3: Task(id=3, description="Share feedback", completed=False, timer=False)
        },
        img={1: "/FrontEnd/img/Reading-Zone-png.jpg"},
        last_edited=datetime(2025, 9, 9, 10, 20, 0)
    ),
    5: Note(
        id=5,
        labels=get_labels_by_ids([1]),
        title="Client Meeting Notes",
        subtitle="Keep a record of all client interactions in one place so you can easily refer back to them.",
        content="Notes from the latest client meeting, including action items and follow-up tasks.",
        link="https://example.com/client-meeting",
        task={
            1: Task(id=1, description="Send thank you email", completed=False, timer=False),
            2: Task(id=2, description="Update CRM", completed=False, timer=False),
            3: Task(id=3, description="Prepare proposal", completed=False, timer=False)
        },
        img={
            1: "/FrontEnd/img/Modern-interior-Home.png", 
            2: "/FrontEnd/img/Reading-Zone-png.jpg", 
            3: "/FrontEnd/img/Coffe-Shop.png"
        },
        last_edited=datetime(2025, 9, 8, 16, 53, 0)
    ),
    6: Note(
        id=6,
        labels=get_labels_by_ids([4]),
        title="Project Kickoff Plan",
        subtitle="Lay out the initial roadmap for your new project.",
        content="Outlined the project scope, key milestones, and assigned roles for the kickoff.",
        link="https://example.com/project-kickoff",
        task={
            1: Task(id=1, description="Finalize roadmap", completed=False, timer=False),
            2: Task(id=2, description="Assign tasks", completed=False, timer=False),
            3: Task(id=3, description="Schedule kickoff meeting", completed=False, timer=False)
        },
        img={
                1: "/FrontEnd/img/Reading-Zone-png.jpg", 
                2: "/FrontEnd/img/Coffe-Shop.png"
            },
        last_edited=datetime(2025, 9, 7, 10, 43, 0)
    )
}

def note_to_listnote(note: Note) -> ListNote:
    tasks_done = sum(1 for task in note.task.values() if task.completed)
    tasks_count = len(note.task)
    has_timer = any(task.timer for task in note.task.values())
    time = note.last_edited.strftime("%H:%M")
    has_shared = False  #DE MOMENT ES FALS, CUAN INCORPORI LA FUNCIONALITAT DE COMPARTIR CANVIAREM AQUI
    img_preview = next(iter(note.img.values()), "") if note.img else ""
    return ListNote(
        id=note.id,
        title=note.title,
        subtitle=note.subtitle,
        tasks_done=tasks_done,
        tasks_count=tasks_count,
        labels=note.labels,
        img=img_preview,
        time=time,
        has_timer=has_timer,
        has_shared=has_shared,
        has_link=bool(note.link)
    )

list_notes = [note_to_listnote(note) for note in notes.values()]

@app.get("/notes")
def get_notes():
    return list_notes

@app.get("/notes/{note_id}")
def get_note(note_id: int):
    note = notes.get(note_id)
    if note:
        return note
    raise HTTPException(status_code=404, detail="Note not found")
