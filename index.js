function openDashboard() {
  window.location.href = "dashboard.html";
}

// function to handle task addition
function addTask(event) {
  event.preventDefault();
  
  const title = document.getElementById("new-task-input").value;                  // get task input value
  const selectedPriority = document.querySelector(".btn-group button.selected"); // get priority selection
  
// check input field and alert
  if(!title && !selectedPriority){
    alert("Please fill in all fields.");
    return;
  }
  
  else if (!title){
    alert("Please enter a Title");
    return;
  }
  
  else if (!selectedPriority) {
    alert("Please select a priority for the task.");
    return;
  }

  else{

  const priority = selectedPriority.getAttribute("data-priority"); // get priority
  
  const task = { // object creation
    title,
    priority
  };

  const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  existingTasks.push(task);

  displayTask(task); // function call for displaying task
  saveTasksToLocalStorage(existingTasks);

  
  // clear the form after submitting the task
  resetForm();
  }
}
 

// Function to reset the new task form
function resetForm() {
  document.getElementById("new-task-form").reset();
  priorityButtons.forEach(button => button.classList.remove("selected"));
}
    

// function to create task elements
function createTaskElement(task) {
  const li = document.createElement("li"); // create element li used to display a single task in the task list.
    
  const taskContent = document.createElement("div");  // create element div that serves as a container for the task content, including the task title.
  taskContent.className = "task-content";            // assigning class for styling purpose
  taskContent.textContent = task.title;             // Set the task title as text content of the div
    
  const editButton = document.createElement("button"); // create edit button
  editButton.innerText = "Edit";
  editButton.className = "edit-btn";
  editButton.addEventListener("click", () => editTask(task, li)); // function call for editing
    
  const deleteButton = document.createElement("button"); // create delete button
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete-btn";
  deleteButton.addEventListener("click", () => deleteTask(li)); // function call for deleting 
    
  li.appendChild(taskContent);     // add the textcontent i.e task title directly to the li element
  li.appendChild(editButton);     // add the edit button as part of the task item.
  li.appendChild(deleteButton);  // add the delete button as part of the task item.
    
  return li;
}
    
    
// Function to display a task in the appropriate container based on its priority
function displayTask(task) {
  const containerMap = {
    High: "high-priority-container",
    Medium: "medium-priority-container",
    Low: "low-priority-container"
  };
    
  const taskContainer = document.getElementById(containerMap[task.priority]);
  const taskList = taskContainer.querySelector(".tasklist");
  const taskElement = createTaskElement(task);
  taskList.appendChild(taskElement);
}


// Function to handle task editing
function editTask(task, taskElement) {
  const newTitle = prompt("Edit task title:", task.title);
  if (newTitle) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = tasks.findIndex((item) => item.title === task.title);
    
    if (taskIndex !== -1) {
      tasks[taskIndex].title = newTitle;
      const updatedTask = tasks[taskIndex];
    
      // Remove the existing task element
      taskElement.remove();
    
      // Re-create the task element with the updated data and add it back to the appropriate container
      displayTask(updatedTask);
    
      saveTasksToLocalStorage(tasks);
    }
  }
}
    
   
// Function to handle task deletion
function deleteTask(taskElement) {
  if (confirm("Are you sure you want to delete this task?")) {
    const taskList = taskElement.parentElement;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = Array.from(taskList.children).indexOf(taskElement);
    
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
       saveTasksToLocalStorage(tasks);
    }
    
    taskElement.remove();
  }
}
    

// event listener for the "Add task" button in the input to add a new task
document.getElementById("new-task-btn").addEventListener("click", addTask);
    
// event listeners for the priority buttons to toggle their selection state
const priorityButtons = document.querySelectorAll(".btn-group button");
priorityButtons.forEach(button => {
  button.addEventListener("click", () => {
    priorityButtons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
  });
});

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
    
window.addEventListener("load", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => displayTask(task));
});
    