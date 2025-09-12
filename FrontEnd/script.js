/* LEFT SIDEBAR HOVER AND CLICK EFFECT */

document.addEventListener('DOMContentLoaded', function () {
    const railBtns = document.querySelectorAll('.rail-btn');
    railBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            railBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    initAllTaskFeatures();
});

/* 2nd SIDEBAR HOVER AND CLICK EFFECT*/

document.querySelectorAll('.sidebar-list li').forEach(item => {
    item.addEventListener('click', function () {
        document.querySelectorAll('.sidebar-list li.active').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
    });
});

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

/* NOTES LIST */

function clickEffectNotes(){
    document.querySelectorAll('.note-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.note-item.active').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/* MERGE ADD NOTE FOR PHONE AND TABLET AND PC */
['add-notes-btn', 'create-btn'].forEach(btnId => {
    document.getElementById(btnId).addEventListener('click', function (){
        const noteHTML = `
    <div class="note-item">
        <div class="note-content">
            <div class="note-title" title="New Note" contenteditable="true">INSERT TEXT</div>
            <div class="note-subtitle" title="New Subtitle" contenteditable="true">INSERT TEXT</div>
            <div class="note-meta">
                <span class="meta-link">
                    <i class="bi bi-link-45deg meta-icon"></i>
                    <span contenteditable="true">3</span>
                </span>
                <span class="meta-label label-project"><i class="bi bi-tag-fill"></i><span contenteditable="true">Project</span></span>
            </div>
            <div class="note-footer">
                <span class="note-time" contenteditable="true">10:43 AM</span>
                <div class="-footer-divider"></div>
                <span class="note-notebook">
                    <i class="bi bi-journal"></i>
                    <span contenteditable="true">NoteBook-01</span>
                </span>
            </div>
        </div>
    </div>
    `;
    
    if(btnId === 'add-notes-btn'){
        this.insertAdjacentHTML('beforebegin', noteHTML);
    } else {
        const notesContainer = document.getElementById('add-notes-btn').parentNode;
        notesContainer.insertAdjacentHTML('afterbegin', noteHTML);
    }

    initAllTaskFeatures(); 

    })
});

/* PHONE HAMBURGUER TO OPEN SIDEBAR MENU */

document.getElementById('open-sidebar-btn').addEventListener('click', function () {
    document.body.classList.add('show-sidebar');
});

document.querySelector('.sidebar-overlay').addEventListener('click', function () {
    document.body.classList.remove('show-sidebar');
});

document.querySelector('.sidebar .close-sidebar').addEventListener('click', function () {
    document.body.classList.remove('show-sidebar');
});

/* PHONE AND TABLET FUNCTIONALLITY */

document.querySelectorAll('.note-item').forEach(function (note) {
    note.addEventListener('click', function () {
        if (window.innerWidth <= 1024) {
            document.body.classList.add('show-two-thirds');
        }
    });
});

/* CLOSE BUTTON */

document.getElementById('close-two-thirds-btn').addEventListener('click', function () {
    document.body.classList.remove('show-two-thirds');
});

/* NEW NOTES LISTENERS FOR PHONE TABLET */

function addNoteItemListeners() {
    document.querySelectorAll('.note-item').forEach(function (note) {
        if (!note.classList.contains('listener-added')) {
            note.addEventListener('click', function () {
                if (window.innerWidth <= 1024) {
                    document.body.classList.add('show-two-thirds');
                }
            });
            note.classList.add('listener-added');
        }
    });
}

/* HAMBURGUER ICON */

document.getElementById('group-excess-of-length-btn').addEventListener('click', function (e) {
    e.stopPropagation();
    const dropdown = document.getElementById('toolbar-dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    const rect = this.getBoundingClientRect();
    dropdown.style.top = '50px';
    dropdown.style.left = rect.left + window.scrollX + 'px';
});

document.addEventListener('click', function () {
    document.getElementById('toolbar-dropdown').style.display = 'none';
});

/* TASKS FUNCTIONS */

function initTaskListeners() {
    // Activate task
    document.querySelectorAll('.editor-tasks .task-row-wrapper').forEach(wrapper => {
        wrapper.onclick = function (e) {
            if (e.target.closest('.task-btn')) return;
            document.querySelectorAll('.editor-tasks .task-row-wrapper').forEach(w => {
                w.classList.remove('active');
                const row = w.querySelector('.task-row');
                if (row) row.classList.remove('active');
            });
            this.classList.add('active');
            const row = this.querySelector('.task-row');
            if (row) row.classList.add('active');
        };
    });

    // Delete task
    document.querySelectorAll('.editor-tasks .task-btn[title="Eliminar"]').forEach(btn => {
        btn.onclick = function (e) {
            e.stopPropagation();
            const task = this.closest('.task-row-wrapper');
            if (task) task.remove();
        };
    });

    // Edit task 
    document.querySelectorAll('.editor-tasks .task-btn[title="Editar"]').forEach(btn => {
        btn.onclick = function (e) {
            e.stopPropagation();
            const taskRow = this.closest('.task-row');
            if (!taskRow) return;
            const titleSpan = taskRow.querySelector('.task-title');
            if (!titleSpan) return;

            if (taskRow.querySelector('.task-title-edit')) return;

            const input = document.createElement('input');
            input.type = 'text';
            input.value = titleSpan.textContent;
            input.className = 'task-title-edit';
            input.style.fontFamily = 'Montserrat, Arial, Helvetica, sans-serif';
            input.style.fontSize = 'inherit';
            input.style.width = '80%';

            titleSpan.replaceWith(input);
            input.focus();

            function saveEdit() {
                const newSpan = document.createElement('span');
                newSpan.className = 'task-title';
                newSpan.textContent = input.value || 'Task title';
                input.replaceWith(newSpan);
            }

            input.addEventListener('blur', saveEdit);
            input.addEventListener('keydown', function (ev) {
                if (ev.key === 'Enter') {
                    input.blur();
                }
            });
        };
    });
}

/* FUNCTIONALLITY TO ADD TASK BTN */

function initAddTaskBtn() {
    const addTaskBtn = document.querySelector('.two-thirds .add-task-btn');
    const tasksContainer = document.querySelector('.two-thirds .editor-tasks');
    if (addTaskBtn && tasksContainer) {
        addTaskBtn.onclick = function () {
            const newTask = document.createElement('div');
            newTask.className = 'task-row-wrapper';
            newTask.innerHTML = `
                <span class="task-drag">
                    <i class="bi bi-grip-vertical"></i>
                </span>
                <div class="task-row">
                    <div class="task-content">
                        <div class="task-row-top">
                            <input type="checkbox">
                            <span class="task-title">New Task</span>
                        </div>
                        <div class="task-row-bottom">
                            <div class="task-row-info">
                                <span class="task-deadline">
                                    <i class="bi bi-flag"></i> Deadline
                                </span>
                                <span class="task-time">
                                    <i class="bi bi-alarm"></i> Add a Deadline
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
            `;
            tasksContainer.insertBefore(newTask, addTaskBtn);
            
        };
    }
}

function initAllTaskFeatures() {
    initTaskListeners();
    initTaskDeadline();
    initTaskDragAndDrop();
    addNoteItemListeners();
    initAddTaskBtn();
    clickEffectNotes()
}

function initTaskDeadline() {
    // Make the Add a Deadline button editable
    document.querySelectorAll('.editor-tasks .task-time').forEach(span => {
        span.onclick = function (e) {
            e.stopPropagation();
            const taskRow = this.closest('.task-row');
            if (taskRow) {
                const timerBtn = taskRow.querySelector('.task-btn[title="Temporizador"]');
                if (timerBtn) timerBtn.click();
            }
        };
    });

    // Make the Breakpoint button editable
    document.querySelectorAll('.editor-tasks .breakpoint-btn').forEach(btn => {
        btn.onclick = function (e) {
            e.stopPropagation();
            const taskRow = this.closest('.task-row');
            if (taskRow) {
                const breakpointBtn = taskRow.querySelector('.task-btn[title="Breakpoint"]');
                if (breakpointBtn) breakpointBtn.click();
            }
        };
    });

    // Add a Deadline
    document.querySelectorAll('.editor-tasks .task-btn[title="Temporizador"]').forEach(btn => {
        btn.onclick = function (e) {
            e.stopPropagation();
            document.querySelectorAll('.deadline-modal-overlay').forEach(m => m.remove());

            const overlay = document.createElement('div');
            overlay.className = 'deadline-modal-overlay';

            const modal = document.createElement('div');
            modal.className = 'deadline-modal';

            modal.innerHTML = `
                <h3>Select a deadline date</h3>
                <input type="date" class="deadline-date" />
                <button class="modal-btn">Next</button>
            `;
            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            modal.querySelector('.modal-btn').onclick = function () {
                const dateValue = modal.querySelector('.deadline-date').value;
                if (!dateValue) {
                    modal.querySelector('.deadline-date').focus();
                    return;
                }
                modal.innerHTML = `
                    <h3>Select a deadline time</h3>
                    <input type="time" class="deadline-time" />
                    <button class="modal-btn">Set deadline</button>
                `;
                modal.querySelector('.modal-btn').onclick = function () {
                    const timeValue = modal.querySelector('.deadline-time').value;
                    if (!timeValue) {
                        modal.querySelector('.deadline-time').focus();
                        return;
                    }
                    const taskRow = btn.closest('.task-row');
                    if (taskRow) {
                        const deadlineSpan = taskRow.querySelector('.task-time');
                        if (deadlineSpan) {
                            const dateObj = new Date(dateValue + 'T' + timeValue);
                            const day = dateObj.getDate();
                            const month = dateObj.toLocaleString('en-GB', { month: 'short' });
                            let hour = dateObj.getHours();
                            const minute = dateObj.getMinutes().toString().padStart(2, '0');
                            const ampm = hour >= 12 ? 'PM' : 'AM';
                            hour = hour % 12;
                            hour = hour ? hour : 12; // 0 => 12
                            const formatted = `${day} ${month}, ${hour}:${minute} ${ampm}`;
                            deadlineSpan.innerHTML = `<i class="bi bi-alarm"></i> ${formatted}`;
                        }
                    }
                    overlay.remove();
                };
            };

            overlay.onclick = function (ev) {
                if (ev.target === overlay) overlay.remove();
            };
        };
    });

    // Deadline
    document.querySelectorAll('.editor-tasks .task-btn[title="Flag"]').forEach(btn => {
        btn.onclick = function (e) {
            e.stopPropagation();
            document.querySelectorAll('.deadline-modal-overlay').forEach(m => m.remove());

            const overlay = document.createElement('div');
            overlay.className = 'deadline-modal-overlay';

            const modal = document.createElement('div');
            modal.className = 'deadline-modal';

            modal.innerHTML = `
                <h3>Select a deadline date</h3>
                <input type="date" class="deadline-date" />
                <button class="modal-btn">Set deadline</button>
            `;
            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            modal.querySelector('.modal-btn').onclick = function () {
                const dateValue = modal.querySelector('.deadline-date').value;
                if (!dateValue) {
                    modal.querySelector('.deadline-date').focus();
                    return;
                }
                const taskRow = btn.closest('.task-row');
                if (taskRow) {
                    const deadlineSpan = taskRow.querySelector('.task-deadline');
                    if (deadlineSpan) {
                        const dateObj = new Date(dateValue);
                        const day = dateObj.getDate();
                        const month = dateObj.toLocaleString('en-GB', { month: 'short' });
                        deadlineSpan.innerHTML = `<i class="bi bi-flag"></i> Deadline ${day} ${month}`;
                    }
                }
                overlay.remove();
            };

            overlay.onclick = function (ev) {
                if (ev.target === overlay) overlay.remove();
            };
        };
    });

    // Breakpoint
    document.querySelectorAll('.editor-tasks .task-btn[title="Breakpoint"]').forEach(btn => {
        btn.onclick = function (e) {
            e.stopPropagation();
            document.querySelectorAll('.deadline-modal-overlay').forEach(m => m.remove());

            const overlay = document.createElement('div');
            overlay.className = 'deadline-modal-overlay';

            const modal = document.createElement('div');
            modal.className = 'deadline-modal';

            modal.innerHTML = `
                <h3>Select a breakpoint date</h3>
                <input type="date" class="breakpoint-date" />
                <button class="modal-btn">Next</button>
            `;
            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            modal.querySelector('.modal-btn').onclick = function () {
                const dateValue = modal.querySelector('.breakpoint-date').value;
                if (!dateValue) {
                    modal.querySelector('.breakpoint-date').focus();
                    return;
                }
                modal.innerHTML = `
                    <h3>Select a breakpoint time</h3>
                    <input type="time" class="breakpoint-time" />
                    <button class="modal-btn">Next</button>
                `;
                modal.querySelector('.modal-btn').onclick = function () {
                    const timeValue = modal.querySelector('.breakpoint-time').value;
                    if (!timeValue) {
                        modal.querySelector('.breakpoint-time').focus();
                        return;
                    }
                    modal.innerHTML = `
                        <h3>Select a color</h3>
                        <div style="display:flex; gap:10px; margin-bottom:16px;">
                            <span class="breakpoint-color" style="background:#e74c3c;" data-color="#e74c3c"></span>
                            <span class="breakpoint-color" style="background:#f1c40f;" data-color="#f1c40f"></span>
                            <span class="breakpoint-color" style="background:#2ecc71;" data-color="#2ecc71"></span>
                            <span class="breakpoint-color" style="background:#3498db;" data-color="#3498db"></span>
                            <span class="breakpoint-color" style="background:#9b59b6;" data-color="#9b59b6"></span>
                        </div>
                        <button class="modal-btn" disabled>Set breakpoint</button>
                    `;
                    let selectedColor = null;
                    modal.querySelectorAll('.breakpoint-color').forEach(colorEl => {
                        colorEl.onclick = function () {
                            modal.querySelectorAll('.breakpoint-color').forEach(c => c.style.outline = '');
                            this.style.outline = '2px solid #333';
                            selectedColor = this.getAttribute('data-color');
                            modal.querySelector('.modal-btn').disabled = false;
                        };
                    });
                    modal.querySelector('.modal-btn').onclick = function () {
                        if (!selectedColor) return;
                        const taskRow = btn.closest('.task-row');
                        if (taskRow) {
                            const dateObj = new Date(dateValue + 'T' + timeValue);
                            const day = dateObj.getDate();
                            const month = dateObj.toLocaleString('en-GB', { month: 'short' });
                            let hour = dateObj.getHours();
                            const minute = dateObj.getMinutes().toString().padStart(2, '0');
                            const ampm = hour >= 12 ? 'PM' : 'AM';
                            hour = hour % 12;
                            hour = hour ? hour : 12;
                            const formatted = `${day} ${month}, ${hour}:${minute} ${ampm}`;

                            const btnHTML = `
                                <button class="task-time breakpoint-btn">
                                    <span class="breakpoint-color" style="background:${selectedColor};"></span>
                                    Breakpoint on - ${formatted}
                                </button>
                            `;

                            const taskTime = taskRow.querySelector('.task-time');
                            if (taskTime) {
                                const oldBtn = taskRow.querySelector('.breakpoint-btn');
                                if (oldBtn) oldBtn.remove();
                                taskTime.insertAdjacentHTML('afterend', btnHTML);
                            }
                        }
                        overlay.remove();
                        initTaskDeadline();
                    };
                };
            };

            overlay.onclick = function (ev) {
                if (ev.target === overlay) overlay.remove();
            };
        };
    });
}

document.querySelectorAll('.editor-tasks .task-btn[title="Breakpoint"]').forEach(btn => {
    btn.onclick = function (e) {
        e.stopPropagation();
        document.querySelectorAll('.deadline-modal-overlay').forEach(m => m.remove());

        const overlay = document.createElement('div');
        overlay.className = 'deadline-modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'deadline-modal';

        modal.innerHTML = `
            <h3>Select a breakpoint date</h3>
            <input type="date" class="breakpoint-date" />
            <button class="modal-btn">Next</button>
        `;
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        modal.querySelector('.modal-btn').onclick = function () {
            const dateValue = modal.querySelector('.breakpoint-date').value;
            if (!dateValue) {
                modal.querySelector('.breakpoint-date').focus();
                return;
            }
            modal.innerHTML = `
                <h3>Select a breakpoint time</h3>
                <input type="time" class="breakpoint-time" />
                <button class="modal-btn">Next</button>
            `;
            modal.querySelector('.modal-btn').onclick = function () {
                const timeValue = modal.querySelector('.breakpoint-time').value;
                if (!timeValue) {
                    modal.querySelector('.breakpoint-time').focus();
                    return;
                }
                modal.innerHTML = `
                    <h3>Select a color</h3>
                    <div style="display:flex; gap:10px; margin-bottom:16px;">
                        <span class="breakpoint-color" style="background:#e74c3c;" data-color="#e74c3c"></span>
                        <span class="breakpoint-color" style="background:#f1c40f;" data-color="#f1c40f"></span>
                        <span class="breakpoint-color" style="background:#2ecc71;" data-color="#2ecc71"></span>
                        <span class="breakpoint-color" style="background:#3498db;" data-color="#3498db"></span>
                        <span class="breakpoint-color" style="background:#9b59b6;" data-color="#9b59b6"></span>
                    </div>
                    <button class="modal-btn" disabled>Set breakpoint</button>
                `;
                let selectedColor = null;
                modal.querySelectorAll('.breakpoint-color').forEach(colorEl => {
                    colorEl.onclick = function () {
                        modal.querySelectorAll('.breakpoint-color').forEach(c => c.style.outline = '');
                        this.style.outline = '2px solid #333';
                        selectedColor = this.getAttribute('data-color');
                        modal.querySelector('.modal-btn').disabled = false;
                    };
                });
                modal.querySelector('.modal-btn').onclick = function () {
                    if (!selectedColor) return;
                    const taskRow = btn.closest('.task-row');
                    if (taskRow) {
                        const dateObj = new Date(dateValue + 'T' + timeValue);
                        const day = dateObj.getDate();
                        const month = dateObj.toLocaleString('en-GB', { month: 'short' });
                        let hour = dateObj.getHours();
                        const minute = dateObj.getMinutes().toString().padStart(2, '0');
                        const ampm = hour >= 12 ? 'PM' : 'AM';
                        hour = hour % 12;
                        hour = hour ? hour : 12;
                        const formatted = `${day} ${month}, ${hour}:${minute} ${ampm}`;

                        const btnHTML = `
                                    <button class="breakpoint-btn">
                                        <span class="breakpoint-color" style="background:${selectedColor};"></span>
                                        Breakpoint on - ${formatted}
                                    </button>
                                `;

                        const taskTime = taskRow.querySelector('.task-time');
                        if (taskTime) {
                            const oldBtn = taskRow.querySelector('.breakpoint-btn');
                            if (oldBtn) oldBtn.remove();
                            taskTime.insertAdjacentHTML('afterend', btnHTML);
                        }
                    }
                    overlay.remove();
                };
            };
        };

        overlay.onclick = function (ev) {
            if (ev.target === overlay) overlay.remove();
        };
    };
});

initTaskDeadline();

function initTaskDragAndDrop() {
    const tasksContainer = document.querySelector('.editor-tasks');
    let draggedTask = null;

    tasksContainer.querySelectorAll('.task-drag').forEach(grip => {
        const taskRowWrapper = grip.closest('.task-row-wrapper');
        grip.setAttribute('draggable', 'true');

        grip.addEventListener('dragstart', function (e) {
            draggedTask = taskRowWrapper;
            setTimeout(() => {
                taskRowWrapper.classList.add('dragging');
                tasksContainer.classList.add('dragging-tasks');
            }, 0);
            e.dataTransfer.effectAllowed = 'move';
        });

        grip.addEventListener('dragend', function () {
            if (draggedTask) draggedTask.classList.remove('dragging');
            tasksContainer.classList.remove('dragging-tasks');
            draggedTask = null;
        });
    });

    tasksContainer.querySelectorAll('.task-row-wrapper').forEach(wrapper => {
        wrapper.addEventListener('dragover', function (e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            if (draggedTask && draggedTask !== this) {
                this.classList.add('drag-over');
            }
        });

        wrapper.addEventListener('dragleave', function () {
            this.classList.remove('drag-over');
        });

        wrapper.addEventListener('drop', function (e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            if (draggedTask && draggedTask !== this) {
                const bounding = this.getBoundingClientRect();
                const offset = e.clientY - bounding.top;
                if (offset < bounding.height / 2) {
                    this.parentNode.insertBefore(draggedTask, this);
                } else {
                    this.parentNode.insertBefore(draggedTask, this.nextSibling);
                }
            }
        });
    });
}