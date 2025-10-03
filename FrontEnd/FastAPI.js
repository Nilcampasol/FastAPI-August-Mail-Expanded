// CARREGAR TOTES LES NOTES-LIST AL SIDEBAR //
// CARREGAR TOTES LES NOTES-LIST AL SIDEBAR //
// CARREGAR TOTES LES NOTES-LIST AL SIDEBAR //

function compareFn(a, b) {
    console.log(Date.parse(b.last_edited) - Date.parse(a.last_edited))
    return Date.parse(b.last_edited) - Date.parse(a.last_edited)
}

async function loadNotesList() {
    const response = await fetch('http://localhost:8000/notes');
    const list_notes = await response.json();
    const notesList = document.getElementById('notes-list');
    const addBtn = document.getElementById('add-notes-btn');
    notesList.innerHTML = '';
    list_notes.sort(compareFn)
    list_notes.forEach(note => {

        notesList.innerHTML += `
            <div id="${note.id}" class="note-item" onClick="fetchArticle(${note.id})" data-id="${note.id}">
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

    if (typeof initAllTaskFeatures === 'function') {
        initAllTaskFeatures();
    }

}

// LOAD CONCRETE NOTES //

function filterThroughtNotes(list_notes) {

    for(let i=0; i<list_notes.length; i++) {
        //list_notes es una llista de notes, la hem de recorre, netejar la llista de notes actual que tenim a note-items, i imprimir nomes les notes de la llista de listnotes
    }

}

// LOAD NOTES WITH TIMER //

async function loadTimerNotes() {
    const response = await fetch('http://localhost:8000/notes');
    const list_notes = await response.json();
    const notesList = document.getElementById('notes-list');
    const addBtn = document.getElementById('add-notes-btn');
    notesList.innerHTML = '';
    list_notes.sort(compareFn)
    list_notes.forEach(note => {
        if (note.has_timer) { //DIFERENT AL ANTERIOR //

            notesList.innerHTML += `
                <div id="${note.id}" class="note-item" onClick="fetchArticle(${note.id})" data-id="${note.id}">
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
        }
    });

    notesList.appendChild(addBtn);

    if (typeof initAllTaskFeatures === 'function') {
        initAllTaskFeatures();
    }

}

// SEARCH FOR ITEMS //

function searchFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("notes-list");
    li = ul.getElementsByClassName("note-item");
    
    console.log(li)
    console.log(filter)

    const filtered_items = []

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("note-title")[0].innerText
        if (a.toUpperCase().indexOf(filter) > -1) {
            filtered_items.push(li[i].id)
        }
    }

    console.log(filtered_items);
    //AT THIS POINT WE ARE GETTING THE FILTERED FOR THE LETTER LIST, NOW WE HAVE TO NOT UPDATE EVERYTHING AND UPLOAD THIS LIST ONLY OF NOTELISTS

    //WE HAVE TO CALL TO THE FUNCTION LIKE THIS: loadfilterThroughtNotes(filtered_items)
}


document.addEventListener('DOMContentLoaded', loadNotesList);

// DONAR LA FUNCIÓ ALS ITEMS DE LES NOTES-LIST PER QUE APAREGUI EL DETALL //
// DONAR LA FUNCIÓ ALS ITEMS DE LES NOTES-LIST PER QUE APAREGUI EL DETALL //
// DONAR LA FUNCIÓ ALS ITEMS DE LES NOTES-LIST PER QUE APAREGUI EL DETALL //

function fetchArticle(note_id) {

    fetch(`http://localhost:8000/notes/${note_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

        .then(response => response.json())
        .then(response => { drawArticle(response) })

}

function drawArticle(note) {



    document.querySelector('.editor-header').innerHTML = `
                <i class="bi bi-journal-medical editor-note-icon"></i>
                <span class="editor-title">NoteBook-${note.id}</span>
                <div class="editor-label"></div>
                <span class="editor-date">Last edited: ${note.last_edited}</span>
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
    {
        Object.values(note.task).forEach((task, idx) =>
            tasksHtml += `
                    <div class="task-row-wrapper${idx === 0 ? ' active' : ''}">
                        <span class="task-drag">
                            <i class="bi bi-grip-vertical"></i>
                        </span>
                        <div class="task-row${idx === 0 ? ' active' : ''}">
                            <div class="task-content">
                                <div class="task-row-top">
                                    <input onClick="checkTask(${task.id}, ${note.id})" type="checkbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''} />
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
                `  )
    };

    const imagesHtml = Object.values(note.img).map(src => `<img src="${src}" alt="Imagen de ejemplo" style="margin-bottom: 10px;"/>`).join('');

    tasksHtml += `
                <div onClick="saveNewTask(${note.id});" class="add-task-row">
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

    tasksContainer.innerHTML = tasksHtml;

    if (typeof initAllTaskFeatures === 'function') {
        initAllTaskFeatures();
    }
}

// ACTUALIZA UNA NOTA EN CONCRETO //
// ACTUALIZA UNA NOTA EN CONCRETO //
// ACTUALIZA UNA NOTA EN CONCRETO //

async function loadConcreteNoteList(list_note_id) {

    await setActualTime(list_note_id);

    const response = await fetch(`http://localhost:8000/list-note/${list_note_id}`);


    const note = await response.json();
    const noteItem = document.querySelector(`.note-item[data-id="${note.id}"]`);
    if (!noteItem) return;

    noteItem.innerHTML = `
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
        `;

    if (typeof initAllTaskFeatures === 'function') {
        initAllTaskFeatures();
    }

}

// LISTENERS FOR NOTES UPDATES //
// LISTENERS FOR NOTES UPDATES //
// LISTENERS FOR NOTES UPDATES //

// Update Checkbox Task //

async function checkTask(taskId, noteId) {

    const checkbox = document.querySelector(`.editor-tasks input[type="checkbox"][data-task-id="${taskId}"]`);
    const checked = checkbox.checked;

    await fetch(`http://localhost:8000/tasks/${noteId}/${taskId}/done`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: checked })
    });

    await loadConcreteNoteList(noteId);

}

async function saveNewTask(noteId) {
    const taskDescription = 'New Task';
    await fetch(`http://localhost:8000/tasks/${noteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: taskDescription })
    });

    await fetchArticle(noteId);

    await loadConcreteNoteList(noteId);
}

async function setActualTime(noteId) {

    await fetch(`http://localhost:8000/list-note/${noteId}/time`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
    });

}

async function saveNewNoteList() {
    await fetch(`http://localhost:8000/notes/newNote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    await loadNotesList();

}