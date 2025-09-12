from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
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

class Label(BaseModel):
    id: int
    name: str
    css_string: str

general_labels = [
    Label(id=1, name="Personal", css_string= "label-personal"),
    Label(id=2, name="Work", css_string="label-work"),
    Label(id=3, name="Ideas", css_string="label-ideas"),
    Label(id=4, name="Project", css_string="label-project"),
    Label(id=5, name="Team", css_string="label-team"),
    Label(id=6, name="Update", css_string="label-update")
]

class Note(BaseModel):
    id: int
    labels: list[Label] 
    title: str
    subtitle: str
    content: str
    link: str
    task: list[Task]
    img: list[str]
    last_edited: datetime

def get_labels_by_ids(ids):
    return [label for label in general_labels if label.id in ids]

notes = [
    Note(
        id=1,
        labels=get_labels_by_ids([1, 2, 3]),
        title="Brainstorming Session Highlight on all the things i have no idea what i'm writing, this is a long title that should get truncated",
        subtitle="Capture your team's best ideas here, well if you want to do it.",
        content="This note contains a summary of our latest brainstorming session, focusing on creative solutions and new approaches.",
        link="https://example.com/brainstorming-session",
        task=[
            Task(id=1, description="Review session notes", completed=True),
            Task(id=2, description="Share with team", completed=True),
            Task(id=3, description="Schedule follow-up meeting", completed=False)
        ],
        img=["/FrontEnd/img/Coffe-Shop.png", "/FrontEnd/img/Reading-Zone-png.jpg"],
        last_edited=datetime(2025, 9, 12, 15, 20, 0)
    ),
    Note(
        id=2,
        labels=get_labels_by_ids([4, 2, 3]),
        title="Helping a local business",
        subtitle="Amet minim mollit non deserunt iluminated his shop poorly.",
        content="Discussed ways to support local shops, including marketing tips and community engagement.",
        link="https://example.com/local-business-support",
        task=[
            Task(id=1, description="Create flyer", completed=False),
            Task(id=2, description="Contact local shop owners", completed=False),
            Task(id=3, description="Organize event", completed=False)
        ],
        img=["/FrontEnd/img/Modern-interior-Home.png", "/FrontEnd/img/Reading-Zone-png.jpg"],
        last_edited=datetime(2025, 9, 11, 11, 24, 0)
    ),
    Note(
        id=3,
        labels=get_labels_by_ids([5, 6]),
        title="Weekly Team Update",
        subtitle="Document this week's accomplishments, challenges, and next steps. I don't think you want to read what we hadn't done due to time constraints.",
        content="This week, the team completed the initial project phase and outlined goals for the upcoming sprint.",
        link="https://example.com/team-update",
        task=[
            Task(id=1, description="Send weekly email", completed=False),
            Task(id=2, description="Update project board", completed=False),
            Task(id=3, description="Plan next sprint", completed=False)
        ],
        img=["/FrontEnd/img/Reading-Zone-png.jpg", "/FrontEnd/img/Modern-interior-Home.png"],
        last_edited=datetime(2025, 9, 10, 9, 2, 0)
    ),
    Note(
        id=4,
        labels=get_labels_by_ids([1]),
        title="Streamline Your Workflow with These Tips",
        subtitle="In today's fast-paced environment we are going to do nothing :/",
        content="Learn how to streamline your workflow, prioritize tasks, and collaborate effectively with your team.",
        link="https://example.com/workflow-tips",
        task=[
            Task(id=1, description="Read article", completed=False),
            Task(id=2, description="Apply one tip", completed=False),
            Task(id=3, description="Share feedback", completed=False)
        ],
        img=["/FrontEnd/img/Reading-Zone-png.jpg"],
        last_edited=datetime(2025, 9, 9, 10, 20, 0)
    ),
    Note(
        id=5,
        labels=get_labels_by_ids([1]),
        title="Client Meeting Notes",
        subtitle="Keep a record of all client interactions in one place so you can easily refer back to them.",
        content="Notes from the latest client meeting, including action items and follow-up tasks.",
        link="https://example.com/client-meeting",
        task=[
            Task(id=1, description="Send thank you email", completed=False),
            Task(id=2, description="Update CRM", completed=False),
            Task(id=3, description="Prepare proposal", completed=False)
        ],
        img=["/FrontEnd/img/Modern-interior-Home.png", "/FrontEnd/img/Reading-Zone-png.jpg", "/FrontEnd/img/Coffe-Shop.png"],
        last_edited=datetime(2025, 9, 8, 16, 53, 0)
    ),
    Note(
        id=6,
        labels=get_labels_by_ids([4]),
        title="Project Kickoff Plan",
        subtitle="Lay out the initial roadmap for your new project.",
        content="Outlined the project scope, key milestones, and assigned roles for the kickoff.",
        link="https://example.com/project-kickoff",
        task=[
            Task(id=1, description="Finalize roadmap", completed=False),
            Task(id=2, description="Assign tasks", completed=False),
            Task(id=3, description="Schedule kickoff meeting", completed=False)
        ],
        img=["/FrontEnd/img/Reading-Zone-png.jpg", "/FrontEnd/img/Coffe-Shop.png"],
        last_edited=datetime(2025, 9, 7, 10, 43, 0)
    )
]

@app.get("/notes/{note_id}")
def get_note(note_id: int):
    for note in notes:
        if note.id == note_id:
            return note
    return {"error": "Note not found"}

