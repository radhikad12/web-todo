
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");

// Update the remaining task count
function updateTaskCount() {
    const tasks = taskList.querySelectorAll(".task-item");
    const remainingTasks = taskList.querySelectorAll(
        ".task-item:not(.completed)"
    ).length;

    taskCount.textContent =
        remainingTasks +
        (remainingTasks === 1
            ? " task remaining"
            : " tasks remaining");

    // Show message when there are no tasks
    emptyMessage.hidden = tasks.length > 0;
}

// Add a new task
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (taskName === "") {
        taskInput.focus();
        return;
    }

    // Create the task list item
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.setAttribute("aria-label", "Mark task as completed");

    // Create task text
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = taskName;

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", "Delete " + taskName);

    // Add elements to the task item
    taskItem.append(checkbox, taskText, deleteButton);

    // Add the task to the list
    taskList.appendChild(taskItem);

    // Clear the input
    taskInput.value = "";
    taskInput.focus();

    updateTaskCount();
});

// Mark a task as completed or incomplete
taskList.addEventListener("change", function (event) {
    if (event.target.classList.contains("task-check")) {
        const taskItem = event.target.closest(".task-item");

        taskItem.classList.toggle(
            "completed",
            event.target.checked
        );

        updateTaskCount();
    }
});

// Delete a task
taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
        const taskItem = event.target.closest(".task-item");

        taskItem.remove();

        updateTaskCount();
    }
});

// Initialize the page
updateTaskCount();
