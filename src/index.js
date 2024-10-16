import "./styles.css";

let projectArr = [];
let taskArr = [];
const dialogNewProject = document.getElementById("dialogNewProject");
const closeDialog = document.getElementById("closeDialog");
const buttonNewProject = document.getElementById("buttonNewProject");
const projectForm = document.querySelector("form");
const displayProjects = document.getElementById("displayProjects");
const rightDiv = document.querySelector(".right-side");

class Project {
  constructor(project_name) {
    this.project_name = project_name;
    this.tasks = [];
  }
}

class Task {
  constructor(project_name, task_name) {
    this.project_name = project_name;
    this.task_name = task_name;
    // this.priority = priority;
    // this.due_date = due_date;
  }
}

function addNewProject(project_name) {
  let project = new Project(project_name);
  projectArr.push(project);
}

buttonNewProject.addEventListener("click", () => {
  dialogNewProject.showModal();
});

closeDialog.addEventListener("click", () => {
  dialogNewProject.close();
});

// function addTaskToProject() {

// }

function addNewTask(project_name, task_name) {
  let task = new Task(project_name, task_name);
  taskArr.push(task);
}

function loadPage(project_name) {
  // Clear existing content in the rightDiv
  rightDiv.innerHTML = "";

  // Create a new div for the project content
  const projectContentDiv = document.createElement("div");
  projectContentDiv.setAttribute("class", "projectContent");

  // Add project-specific content (for now, just the project name)
  const projectTitle = document.createElement("h2");
  projectTitle.textContent = `Project: ${project_name}`;

  const addTaskButton = document.createElement("button");
  addTaskButton.setAttribute("class", "addTaskButton");
  addTaskButton.textContent = "+";

  // addTaskButton.addEventListener("click", () => {
  //   addTaskToProject(project_name);
  // });

  addTaskButton.addEventListener("click", () => {
    const taskName = prompt("Enter a task name:");

    if (taskName) {
      // Find the project in the array
      const project = projectArr.find(
        (proj) => proj.project_name === project_name
      );

      // If the project is found, add the task
      if (project) {
        project.tasks = project.tasks || []; // Initialize tasks array if it doesn't exist
        project.tasks.push(taskName); // Add the task to the project
        console.log(project.tasks);

        // Check if displayTasks div already exists
        let displayTasks = document.querySelector(".displayTasks");

        if (!displayTasks) {
          // If not, create and append it to the rightDiv
          displayTasks = document.createElement("div");
          displayTasks.setAttribute("class", "displayTasks");
          rightDiv.appendChild(displayTasks);
        }

        // Clear the existing tasks display
        displayTasks.innerHTML = "";

        // Append the updated tasks to the displayTasks div
        project.tasks.forEach((task) => {
          const taskDiv = document.createElement("div");
          taskDiv.textContent = task;
          displayTasks.appendChild(taskDiv);
        });
      }
    }
  });

  // Append the title to the project content div
  projectContentDiv.appendChild(projectTitle);

  // Append the project content to the rightDiv
  rightDiv.appendChild(projectContentDiv);
  rightDiv.append(addTaskButton);
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
    console.log(element);
  });
}

projectForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const projectName = document.getElementById("name").value;
  addNewProject(projectName);
  display();
  dialogNewProject.close();
});

function removeProject(index) {
  projectArr.splice(index, 1); // Remove the project from the array
  display(); // Update the project list on the page
}
