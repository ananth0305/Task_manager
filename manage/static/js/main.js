document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

// 🌟 Add Task
document.getElementById("taskForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let title = document.getElementById("taskTitle").value;
    let description = document.getElementById("taskDescription").value;
    let dueDate = document.getElementById("taskDueDate").value;
    let priority = document.getElementById("taskPriority").value;

    let task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        priority,
        status: "Pending",
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("taskForm").reset();
    loadTasks();
});

// 📜 Load Tasks
function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
        let li = document.createElement("li");
        li.classList.add("task-item");
        if (task.status === "Completed") {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div>
                <strong>${task.title}</strong> <br>
                ${task.description} <br>
                <small>Due: ${task.dueDate} | Priority: ${task.priority} | Status: ${task.status}</small>
            </div>
            <div>
                <button class="edit-btn" onclick="editTask(${task.id})">✏️</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">🗑</button>
                <button class="status-btn" onclick="updateStatus(${task.id})">✔</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// ✏ Edit Task
function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = tasks.find((t) => t.id === id);

    if (task) {
        document.getElementById("taskTitle").value = task.title;
        document.getElementById("taskDescription").value = task.description;
        document.getElementById("taskDueDate").value = task.dueDate;
        document.getElementById("taskPriority").value = task.priority;

        tasks = tasks.filter((t) => t.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

// 🗑 Delete Task
function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// ✔ Update Status
function updateStatus(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        if (task.id === id) {
            if (task.status === "Pending") task.status = "In Progress";
            else if (task.status === "In Progress") task.status = "Completed";
            else task.status = "Pending";
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// 🚪 Logout
function logout() {
    alert("Logged out!");
    window.location.href ="login.html";
}
