import "./styles.css";

let projectArr = [];
const dialogNewProject = document.getElementById("dialogNewProject");
const closeDialog = document.getElementById("closeDialog");
const buttonNewProject = document.getElementById("buttonNewProject");
const projectForm = document.querySelector("form");
const displayProjects = document.getElementById("displayProjects");
const rightDiv = document.querySelector(".right-side");

class Project {
  constructor(project_name) {
    this.project_name = project_name;
    this.tasks = []; // Tasks will now be objects with task_name and checked properties
  }

  addTask(task_name) {
    this.tasks.push({ task_name: task_name, checked: false }); // Add task as object with checked state
  }
}

// Helper function to display tasks
function updateTaskDisplay(project) {
  // Check if displayTasks div already exists
  let displayTasks = document.querySelector(".displayTasks");

  if (!displayTasks) {
    // If not, create and append it to the rightDiv
    displayTasks = document.createElement("div");
    displayTasks.setAttribute("class", "displayTasks");
    rightDiv.appendChild(displayTasks);
  }

  // Clear existing tasks display
  displayTasks.innerHTML = "";

  // Append the updated tasks to the displayTasks div
  project.tasks.forEach((task, index) => {
    const taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "taskContainer");

    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "taskDiv");
    taskDiv.textContent = task.task_name;

    const taskCheckbox = document.createElement("input");
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.checked = task.checked; // Set checkbox state based on task's checked property

    // Add event listener to toggle checked state
    taskCheckbox.addEventListener("change", () => {
      task.checked = taskCheckbox.checked; // Update the task's checked state
      console.log(
        `Task "${task.task_name}" checked: ${task.checked ? "yes" : "no"}`
      );
    });

    taskContainer.append(taskCheckbox);
    taskContainer.append(taskDiv);
    displayTasks.appendChild(taskContainer);
  });
}

function loadPage(project_name) {
  // Clear existing content in the rightDiv
  rightDiv.innerHTML = "";

  const project = projectArr.find((proj) => proj.project_name === project_name);

  // Create a new div for the project content
  const projectContentDiv = document.createElement("div");
  projectContentDiv.setAttribute("class", "projectContent");

  // Add project-specific content (for now, just the project name)
  const projectTitle = document.createElement("h2");
  projectTitle.textContent = `Project: ${project_name}`;

  const addTaskButton = document.createElement("button");
  addTaskButton.setAttribute("class", "addTaskButton");
  addTaskButton.textContent = "+";

  // Add event listener for adding a task
  addTaskButton.addEventListener("click", () => {
    const taskName = prompt("Enter a task name:");

    if (taskName) {
      // Add the task to the project
      project.addTask(taskName);
      console.log(project.tasks);

      // Update the task display
      updateTaskDisplay(project);
    }
  });

  // Append the title and add task button to the project content div
  projectContentDiv.appendChild(projectTitle);
  projectContentDiv.append(addTaskButton);

  // Append the project content to the rightDiv
  rightDiv.appendChild(projectContentDiv);

  // Display existing tasks immediately
  updateTaskDisplay(project);
}

function display() {
  displayProjects.innerHTML = "";
  projectArr.forEach((element, index) => {
    const entry = document.createElement("div");
    const projectButton = document.createElement("button");
    const removeButton = document.createElement("button");

    entry.setAttribute("class", "entry");
    removeButton.textContent = "x";
    removeButton.setAttribute("class", "removeButton");
    projectButton.setAttribute("class", "pageProject");
    projectButton.textContent = element.project_name;

    removeButton.addEventListener("click", () => {
      removeProject(index); // Pass the index of the project to be removed
    });

    projectButton.addEventListener("click", () => {
      loadPage(element.project_name); // Call loadPage with the project name
    });

    entry.append(projectButton);
    entry.append(removeButton);
    displayProjects.append(entry);
    loadPage(element.project_name);
  });
}

projectForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const projectName = document.getElementById("name").value;
  addNewProject(projectName);
  display();
  dialogNewProject.close();
});

function addNewProject(project_name) {
  const project = new Project(project_name);
  projectArr.push(project);
}

function removeProject(index) {
  projectArr.splice(index, 1); // Remove the project from the array
  display(); // Update the project list on the page
}
