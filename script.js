// ================= 1. STATE =================
// We store all tasks in an array of objects.
// Each object has a unique id, the task text, and a completed status.
let tasks = [];

// Grab the DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// ================= 2. ACTIONS =================

// Add a new task
function addTask() {
    const text = taskInput.value.trim(); // Remove extra spaces

    // Prevent adding empty tasks
    if (text === "") return;

    // Create the new task object
    const newTask = {
        id: Date.now(), // Unique ID based on timestamp
        description: text,
        completed: false
    };

    // Update state
    tasks.push(newTask);

    // Clear input box
    taskInput.value = "";

    // Re-render the UI
    renderTasks();
}

// Toggle a task's completion status
function toggleTask(id) {
    // Map over the array and flip the 'completed' status if the ID matches
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });

    renderTasks();
}

// Delete a task
function deleteTask(id) {
    // Filter out the task with the matching ID
    tasks = tasks.filter(task => task.id !== id);

    renderTasks();
}

// ================= 3. RENDER =================
// This function completely clears the list and redraws it based on the current 'tasks' array
function renderTasks() {
    // 1. Clear the existing list in the DOM
    taskList.innerHTML = "";

    // 2. Sort tasks: pending tasks first, completed tasks at the bottom
    const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

    // 3. Loop through the sorted array and create HTML elements
    sortedTasks.forEach(task => {
        // Create the list item (<li>)
        const li = document.createElement('li');
        // Add CSS class based on completion status
        li.className = task.completed ? 'task-item completed' : 'task-item';

        // Create the Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(task.id)); // Add event listener

        // Create the Text Span
        const span = document.createElement('span');
        span.textContent = task.description;

        // Create the Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.className = 'delete-btn';
        deleteBtn.setAttribute('aria-label', 'Delete task');
        deleteBtn.addEventListener('click', () => deleteTask(task.id)); // Add event listener

        // Assemble the list item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Add the list item to the main list
        taskList.appendChild(li);
    });
}

// ================= 4. EVENT LISTENERS =================

// Click the arrow button to add a task
addBtn.addEventListener('click', addTask);

// Press "Enter" inside the input to add a task
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Initial render (in case there are tasks, though the array is empty to start)
renderTasks();