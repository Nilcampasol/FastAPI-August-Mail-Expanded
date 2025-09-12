/* LOAD NOTES LIST ITEMS */

document.querySelectorAll('.note-item').forEach(item => {
    item.addEventListener('click', async function () {
        const noteId = this.getAttribute('data-id');
        const response = await fetch(`http://localhost:8000/notes/${noteId}`);
        const note = await response.json();
        console.log(note);

        document.querySelector('.editor-title').textContent = "NoteBook-" + note.id;
        document.querySelector('.editor-main a h1').textContent = note.title;
        document.querySelector('.editor-main a p').textContent = note.content;
        document.querySelector('.editor-main .editor-link').textContent = note.link;

        // Actualizar tareas
        const tasksContainer = document.querySelector('.editor-tasks');
        tasksContainer.innerHTML = '';
        note.task.forEach((task, idx) => {
            tasksContainer.innerHTML += `
                <div class="task-row-wrapper${idx === 0 ? ' active' : ''}">
                    <span class="task-drag">
                        <i class="bi bi-grip-vertical"></i>
                    </span>
                    <div class="task-row${idx === 0 ? ' active' : ''}">
                        <div class="task-content">
                            <div class="task-row-top">
                                <input type="checkbox">
                                <span class="task-title">${task}</span>
                            </div>
                            <div class="task-row-bottom">
                                <div class="task-row-info">
                                    <span class="task-deadline">
                                        <i class="bi bi-flag"></i> Deadline 21 Dec
                                    </span>
                                    <span class="task-time">
                                        <i class="bi bi-alarm"></i> 20 Dec, 9:00 AM
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

        const imagesHtml = note.img.map(src => `<img src="${src}" alt="Imagen de ejemplo" style="margin-bottom: 10px;"/>`).join('');

        tasksContainer.innerHTML += `
            <div class="add-task-row">
                <button class="add-task-btn">
                    <i class="bi bi-plus"></i> Add Task
                </button>
                <div class="editor-images">
                    ${imagesHtml}
                </div>
            </div>
        `;

        // Inicializar funcionalidades de tareas

        if (typeof initAllTaskFeatures === 'function') {
            initAllTaskFeatures();
        }
    });
});