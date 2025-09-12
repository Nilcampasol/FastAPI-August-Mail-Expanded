from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify allowed origins here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API funcionando"}

class Note(BaseModel):
    id: int
    title: str
    subtitle: str
    content: str
    link: str
    task: list[str]
    img: list[str]

notes = [
    Note(
        id=1,
        title="Brainstorming Session Highlight: Exploring New Ideas",
        subtitle="Capture your team's best ideas and foster innovation.",
        content="This note contains a summary of our latest brainstorming session, focusing on creative solutions and new approaches.",
        link="https://example.com/brainstorming-session",
        task=["Review session notes", "Share with team", "Schedule follow-up meeting"],
        img=["/FrontEnd/img/Coffe-Shop.png", "/FrontEnd/img/Reading-Zone-png.jpg"]
    ),
    Note(
        id=2,
        title="Supporting Local Businesses",
        subtitle="Strategies to help small businesses thrive.",
        content="Discussed ways to support local shops, including marketing tips and community engagement.",
        link="https://example.com/local-business-support",
        task=["Create flyer", "Contact local shop owners", "Organize event"],
        img=["/FrontEnd/img/Modern-interior-Home.png", "/FrontEnd/img/Reading-Zone-png.jpg"]
    ),
    Note(
        id=3,
        title="Weekly Team Update",
        subtitle="Summary of team accomplishments and next steps.",
        content="This week, the team completed the initial project phase and outlined goals for the upcoming sprint.",
        link="https://example.com/team-update",
        task=["Send weekly email", "Update project board", "Plan next sprint"],
        img=["/FrontEnd/img/Reading-Zone-png.jpg", "/FrontEnd/img/Modern-interior-Home.png"]  
    ),
    Note(
        id=4,
        title="Workflow Optimization Tips",
        subtitle="Improve productivity with these actionable tips.",
        content="Learn how to streamline your workflow, prioritize tasks, and collaborate effectively with your team.",
        link="https://example.com/workflow-tips",
        task=["Read article", "Apply one tip", "Share feedback"],
        img=["/FrontEnd/img/Coffe-Shop.png"]
    ),
    Note(
        id=5,
        title="Client Meeting Notes",
        subtitle="Document important client interactions and decisions.",
        content="Notes from the latest client meeting, including action items and follow-up tasks.",
        link="https://example.com/client-meeting",
        task=["Send thank you email", "Update CRM", "Prepare proposal"],
        img=["/FrontEnd/img/Modern-interior-Home.png", "/FrontEnd/img/Reading-Zone-png.jpg", "/FrontEnd/img/Coffe-Shop.png"] 
    ),
    Note(
        id=6,
        title="Project Kickoff Plan",
        subtitle="Initial roadmap and objectives for the new project.",
        content="Outlined the project scope, key milestones, and assigned roles for the kickoff.",
        link="https://example.com/project-kickoff",
        task=["Finalize roadmap", "Assign tasks", "Schedule kickoff meeting"],
        img=["/FrontEnd/img/Reading-Zone-png.jpg" ,"/FrontEnd/img/Coffe-Shop.png"]
    )
]

@app.get("/notes/{note_id}")
def get_note(note_id: int):
    for note in notes:
        if note.id == note_id:
            return note
    return {"error": "Note not found"}

