// ================= AUTO CHECK =================
window.onload = function () {

    // If on dashboard, ensure user is logged in
    if (window.location.pathname.includes("dashboard.html")) {

        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "login.html";
        } else {
            loadTasks();
        }
    }
};


// ================= SIGNUP =================
async function signup() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert("Signup successful! Please login.");
        window.location.href = "login.html";
    } else {
        alert(data.message || "Signup failed");
    }
}


// ================= LOGIN =================
async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } else {
        alert(data.message || "Login failed");
    }
}


// ================= LOAD TASKS =================

   async function loadTasks() {

    const token = localStorage.getItem("token");

    const response = await fetch("/api/tasks/all", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (!response.ok) {
        logout();
        return;
    }

    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <h3>You haven’t created any tasks yet.</h3>
                <p>Use the form above to add your first task.</p>
            </div>
        `;
        return;
    }

    tasks.forEach(task => {

        const div = document.createElement("div");

        div.innerHTML = `
            <p><strong>${task.title}</strong></p>
            <p>${task.description || ""}</p>
            <p>${new Date(task.start_time).toLocaleString()}</p>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <hr>
        `;

        taskList.appendChild(div);
    });
}

    
// ================= CREATE TASK =================
async function createTask() {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const start_time = document.getElementById("start_time").value;
    const token = localStorage.getItem("token");

    if (!title || !start_time) {
        alert("Title and Start Time are required");
        return;
    }

    await fetch("/api/tasks/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ title, description, start_time })
    });

    // Clear inputs
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("start_time").value = "";

    loadTasks();
}


// ================= DELETE TASK =================
async function deleteTask(id) {

    const token = localStorage.getItem("token");

    await fetch(`/api/tasks/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    loadTasks();
}


// ================= LOGOUT =================
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}