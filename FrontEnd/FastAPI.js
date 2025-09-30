function addNoteItemClickListeners() {
    document.querySelectorAll('.note-item').forEach(item => {
        item.addEventListener('click', async function () {
            const noteId = this.getAttribute('data-id');
            const response = await fetch(`http://localhost:8000/notes/${noteId}`);
            const note = await response.json();
            const date = new Date(note.last_edited);
            const formattedDate = date.toLocaleString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            }).replace(' ', ', ');

            document.querySelector('.editor-header').innerHTML = `
                <i class="bi bi-journal-medical editor-note-icon"></i>
                <span class="editor-title">NoteBook-${note.id}</span>
                <div class="editor-label"></div>
                <span class="editor-date">Last edited: ${formattedDate}</span>
            `;

            const labelsContainer = document.querySelector('.editor-label');
            let labelsHtml = '';
            note.labels.forEach(label => {
                labelsHtml += `
                    <span class="meta-label ${label.css_string}"><i class="bi bi-tag-fill"></i>${label.name}</span>
                `;
            });
            labelsContainer.innerHTML = labelsHtml;

            const editorMain = document.querySelector('.editor-main');
            editorMain.innerHTML = `
                <h1>${note.title}</h1>
                <p>${note.content}</p>
                <a class="editor-link" href="${note.link || '#'}">${note.link || ''}</a>
            `;

            const tasksContainer = document.querySelector('.editor-tasks');
            let tasksHtml = '';
            Object.values(note.task).forEach((task, idx) => {
                tasksHtml += `
                    <div class="task-row-wrapper${idx === 0 ? ' active' : ''}">
                        <span class="task-drag">
                            <i class="bi bi-grip-vertical"></i>
                        </span>
                        <div class="task-row${idx === 0 ? ' active' : ''}">
                            <div class="task-content">
                                <div class="task-row-top">
                                    <input type="checkbox" ${task.completed ? 'checked' : ''} />
                                    <span class="task-title">${task.description}</span>
                                </div>
                                <div class="task-row-bottom">
                                    <div class="task-row-info">
                                        <span class="task-deadline">
                                            <i class="bi bi-flag"></i> + Add a Deadline
                                        </span>
                                        <span class="task-time">
                                            <i class="bi bi-alarm"></i> + Add a timer
                                        </span>
                                    </div>
                                    <div class="task-row-actions">
                                        <button class="task-btn" title="Temporizador">
                                            <i class="bi bi-stopwatch"></i>
                                        </button>
                                        <button class="task-btn" title="Flag">
                                            <i class="bi bi-flag"></i>
                                        </button>
                                        <button class="task-btn" title="Breakpoint">
                                            <i class="bi bi-flag-fill"></i>
                                        </button>
                                        <button class="task-btn" title="Editar">
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button class="task-btn" title="Eliminar">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            const imagesHtml = Object.values(note.img).map(src => `<img src="${src}" alt="Imagen de ejemplo" style="margin-bottom: 10px;"/>`).join('');

            tasksHtml += `
                <div class="add-task-row">
                    <button class="add-task-btn">
                        <i class="bi bi-plus"></i> Add Task
                    </button>
                    <div class="editor-images">
                        ${imagesHtml}
                    </div>
                </div>
            `;

            // HERE IT WOULD BE LIKELLY TO ADD THE INITIALIZATION OF ALL THE LISTENERS FOR THE NOTES //
            // HERE IT WOULD BE LIKELLY TO ADD THE INITIALIZATION OF ALL THE LISTENERS FOR THE NOTES //
            // HERE IT WOULD BE LIKELLY TO ADD THE INITIALIZATION OF ALL THE LISTENERS FOR THE NOTES //

            addCheckboxListenersToNoteDetails()

            tasksContainer.innerHTML = tasksHtml;

            if (typeof initAllTaskFeatures === 'function') {
                initAllTaskFeatures();
            }
        });
    });
}

async function loadNotesList() {
    const response = await fetch('http://localhost:8000/notes');
    const notes = await response.json();
    const notesList = document.getElementById('notes-list');
    const addBtn = document.getElementById('add-notes-btn');
    notesList.innerHTML = '';
    notes.forEach(note => {
        notesList.innerHTML += `
            <div class="note-item" data-id="${note.id}">
                <div class="note-content">
                    <div class="note-title" title="${note.title}">
                        ${note.title}
                    </div>
                    <div class="note-subtitle" title="${note.subtitle}">
                        ${note.subtitle}
                    </div>
                    <div class="note-meta">
                        <span class="meta-tasks">
                            <i class="bi bi-list-check meta-icon"></i> ${note.tasks_done}/${note.tasks_count}
                        </span>
                        ${note.has_link ? `
                            <span class="meta-link">
                                <i class="bi bi-link-45deg meta-icon"></i>
                            </span>
                        ` : ''}
                        ${renderLabelsWithOverflow(note.labels)}
                    </div>
                    <div class="note-footer">
                        <span class="note-time">${note.time}</span>
                        <div class="-footer-divider"></div>
                        <span class="note-notebook">
                            <i class="bi bi-journal"></i>
                            NoteBook-01
                        </span>
                        ${note.has_timer ? `<span class="note-timer"><i class="bi bi-alarm"></i></span>` : ''}
                    </div>
                </div>
                ${note.img ? `<img class="note-image" src="${note.img}" alt="Nota" />` : ''}
            </div>
        `;
    });

    notesList.appendChild(addBtn);

    addNoteItemClickListeners();

    if (typeof initAllTaskFeatures === 'function') {
        initAllTaskFeatures();
    }
}

document.addEventListener('DOMContentLoaded', loadNotesList);


// FUNCTION TO UPDATE A SINGLE NOTE IN THE LIST //
// FUNCTION TO UPDATE A SINGLE NOTE IN THE LIST //
// FUNCTION TO UPDATE A SINGLE NOTE IN THE LIST //


async function loadConcreteNoteList(noteId) {

    const response = await fetch(`http://localhost:8000/notes/${noteId}`);
    const note = await response.json();

    const concreteNote = document.querySelector(`.note-item[data-id="${note.id}"]`);
    const addBtn = document.getElementById('add-notes-btn');

    concreteNote.innerHTML = '';
    concreteNote.innerHTML += `
            <div class="note-item" data-id="${note.id}">
                <div class="note-content">
                    <div class="note-title" title="${note.title}">
                        ${note.title}
                    </div>
                    <div class="note-subtitle" title="${note.subtitle}">
                        ${note.subtitle}
                    </div>
                    <div class="note-meta">
                        <span class="meta-tasks">
                            <i class="bi bi-list-check meta-icon"></i> ${note.tasks_done}/${note.tasks_count}
                        </span>
                        ${note.has_link ? `
                            <span class="meta-link">
                                <i class="bi bi-link-45deg meta-icon"></i>
                            </span>
                        ` : ''}
                        ${renderLabelsWithOverflow(note.labels)}
                    </div>
                    <div class="note-footer">
                        <span class="note-time">${note.time}</span>
                        <div class="-footer-divider"></div>
                        <span class="note-notebook">
                            <i class="bi bi-journal"></i>
                            NoteBook-01
                        </span>
                        ${note.has_timer ? `<span class="note-timer"><i class="bi bi-alarm"></i></span>` : ''}
                    </div>
                </div>
                ${note.img ? `<img class="note-image" src="${note.img}" alt="Nota" />` : ''}
            </div>
        `;

    concreteNote.appendChild(addBtn);

    addNoteItemClickListeners();

    if (typeof initAllTaskFeatures === 'function') {
        initAllTaskFeatures();
    }
}

// LISTENERS FOR NOTES UPDATES //
// LISTENERS FOR NOTES UPDATES //
// LISTENERS FOR NOTES UPDATES //

// Update Checkbox Task //

function addCheckboxListenersToNoteDetails() {
    document.querySelectorAll('.editor-tasks input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', async function () {
            const taskId = this.dataset.taskId;
            const checked = this.checked;

            await fetch(`https://localhost:8000/tasks/${noteId}/${taskId}/done`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: checked })
            });

            await loadConcreteNoteList(noteId);
        })
    })
}