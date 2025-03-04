import {
  renderProjects,
  renderProjectById,
  renderTasks,
  editProjectForm,
  editTaskForm,
} from "../view/render.js";
import { format } from "date-fns";

class Controller {
  constructor(taskManager) {
    this.taskManager = taskManager;
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.setupThemeToggle();
    this.setupSidebarToggle();
    this.setupAddProjectListener();
    this.setupDeleteProjectListener();
    this.setupEditProjectListener();
    this.setupProjectFormCancel();
    this.setupAddTaskListener();
    this.setupDeleteTaskListeners();
    this.setupEditTaskListeners();
    this.setupTaskFormCancel();
    this.setupTasksByProject();
    this.setupAllTasks();
  }

  setupThemeToggle() {
    const modeToggle = document.getElementById("mode-toggle");
    const body = document.body;

    modeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const theme = body.classList.contains("dark-mode") ? "dark" : "light";
      const toggleIcon = document.createElement("span");
      toggleIcon.classList.add("material-symbols-outlined");
      toggleIcon.textContent = theme === "dark" ? "light_mode" : "dark_mode";

      modeToggle.innerHTML = "";
      modeToggle.appendChild(toggleIcon);
    });
  }

  setupSidebarToggle() {
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const sidebar = document.getElementById("sidebar");
    const dockIcon = document.getElementById("dock-icon");

    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("hidden");
      if (sidebar.classList.contains("sidebar-left")) {
        sidebar.classList.remove("sidebar-left");
        sidebar.style.left = "auto";
        sidebar.style.right = "0";
        dockIcon.textContent = "dock_to_right";
      } else {
        sidebar.classList.add("sidebar-left");
        sidebar.style.left = "0";
        sidebar.style.right = "auto";
        dockIcon.textContent = "dock_to_left";
      }
    });
  }

  setupAddProjectListener() {
    const addProjectForm = document.getElementById("add-project-form");
    addProjectForm.style.display = "none";

    const addProjectButton = document.getElementById("add-project-button");
    addProjectButton.addEventListener("click", () => {
      addProjectForm.style.display = "flex";
    });

    addProjectForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formProject = new FormData(addProjectForm);
      const projectName = formProject.get("project-list-add-input");
      this.setupAddProjectHandler(projectName);
      addProjectForm.reset();
      addProjectForm.style.display = "none";
      renderProjects(this.taskManager.getProjects());
    });
  }

  setupAddProjectHandler(projectName) {
    this.taskManager.addProject(projectName);
  }

  setupDeleteProjectListener() {
    document.addEventListener("click", (event) => {
      const deleteButton = event.target.closest(".project-list-delete-button");
      if (!deleteButton) return;

      const projectTile = deleteButton.closest(".project-list");
      if (!projectTile) return;

      const projectId = Number(projectTile.dataset.projectId);

      const confirmDelete = confirm(
        "Are you sure you want to delete this project?"
      );
      if (!confirmDelete) return;

      this.setupDeleteProjectHandler(projectId);
    });
  }

  setupDeleteProjectHandler(projectId) {
    this.taskManager.deleteProject(projectId);
    renderProjects(this.taskManager.getProjects());
  }

  setupEditProjectListener() {
    document.addEventListener("click", (event) => {
      if (!event.target.classList.contains("project-list-edit-button")) return;

      const projectTile = event.target.closest(".project-list");
      const projectId = projectTile.dataset.projectId;
      const project = this.taskManager.getProjectById(projectId);

      document
        .querySelectorAll(".edit-project-form")
        .forEach((form) => form.remove());

      const form = editProjectForm(project);

      projectTile.replaceWith(form);
    });

    document.addEventListener("submit", (event) => {
      const editForm = event.target.closest("#edit-project-form");

      if (!editForm) return;

      event.preventDefault();

      const projectId = Number(editForm.dataset.projectId);
      const formProject = new FormData(editForm);
      const projectName = formProject.get("project-list-edit-input").trim();

      if (!projectName) {
        alert("Project name cannot be empty!");
        return;
      } else if (projectName.length > 10) {
        alert("Length maximum 10 words!");
        return;
      }

      this.setupEditProjectHandler(projectId, projectName);

      const project = this.taskManager.getProjectById(projectId);

      if (project) {
        const projectTile = renderProjectById(project);
        editForm.replaceWith(projectTile);
      }
    });
  }

  setupEditProjectHandler(projectId, projectName) {
    const updates = {
      name: projectName,
    };
    this.taskManager.editProject(projectId, updates);
  }

  setupProjectFormCancel = () => {
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("project-list-cancel-button")) {
        event.preventDefault();
        const editForm = event.target.closest(".edit-project-form");
        if (editForm) {
          const projectId = Number(editForm.dataset.projectId);
          const project = this.taskManager.getProjectById(projectId);

          const projectTile = renderProjectById(project);
          editForm.replaceWith(projectTile);
        }
        const addForm = event.target.closest(".add-project-form");
        if (addForm) {
          addForm.style.display = "none";
          addForm.elements["project-list-add-input"].value = "";
        }
      }
    });
  };

  setupAddTaskListener() {
    const addTaskForm = document.getElementById("add-task-form");

    addTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formTask = new FormData(addTaskForm);
      const projectId = Number(
        document.getElementById("project-title").dataset.projectId
      );
      const taskData = {
        projectId: projectId,
        title: formTask.get("add-task-title"),
        description: formTask.get("add-task-description"),
        dueDate: formTask.get("add-task-date"),
        priority: formTask.get("add-task-priority"),
        checklist: false,
      };

      if (
        !taskData.projectId ||
        !this.taskManager.getProjectById(taskData.projectId)
      ) {
        alert("Invalid project. Please select a valid project in sidebar.");
        return;
      }

      if (!taskData.title.trim()) {
        alert("Task title cannot be empty.");
        return;
      }

      this.setupAddTaskHandler(taskData);
      addTaskForm.reset();
      addTaskForm.style.display = "none";
      renderTasks(this.taskManager.getTasksByProject(taskData.projectId));
    });
  }

  setupAddTaskHandler(taskData) {
    this.taskManager.addTask(
      taskData.projectId,
      taskData.title,
      taskData.description,
      taskData.dueDate,
      taskData.priority,
      taskData.checklist
    );
  }

  setupDeleteTaskListeners() {
    document.addEventListener("click", (event) => {
      if (!event.target.classList.contains("task-tile-delete-button")) return;

      const taskTile = event.target.closest(".task-tile");
      const taskId = Number(taskTile.dataset.taskId);
      const task = this.taskManager.getTaskById(taskId);

      if (!task) return;

      const confirmation = confirm(
        "Are you sure you want to delete this task?"
      );
      if (!confirmation) return;

      const updatedTask = this.taskManager.getTaskById(taskId);
      const projectId = updatedTask.projectId;

      this.setupDeleteTaskHandler(taskId);

      const projectTitleLabel = document.getElementById("project-title");
      if (
        !projectTitleLabel.dataset.projectId ||
        projectTitleLabel.dataset.projectId === 0
      ) {
        renderTasks(this.taskManager.getTasks());
      } else {
        renderTasks(this.taskManager.getTasksByProject(projectId));
      }
    });
  }

  setupDeleteTaskHandler(taskId) {
    this.taskManager.deleteTask(taskId);
  }

  setupEditTaskListeners() {
    const addTaskForm = document.getElementById("add-task-form");
    addTaskForm.style.display = "none";

    document.getElementById("add-task-button").addEventListener("click", () => {
      addTaskForm.style.display = "flex";

      const dueDateInput = document.getElementById("add-task-date");
      dueDateInput.value = new Date().toISOString().split("T")[0];
    });

    document.addEventListener("click", (event) => {
      if (!event.target.classList.contains("task-tile-edit-button")) return;

      const taskTile = event.target.closest(".task-tile");
      const taskId = Number(taskTile.dataset.taskId);
      const task = this.taskManager.getTaskById(taskId);

      if (!task) return;

      document
        .querySelectorAll(".edit.task-form")
        .forEach((form) => form.remove());

      const form = editTaskForm(task);
      taskTile.insertAdjacentElement("afterend", form);

      document.getElementById("edit-task-title").value = task.title;
      document.getElementById("edit-task-description").value = task.description;
      document.getElementById("edit-task-date").value = task.dueDate;
      document.getElementById("edit-task-priority").value = task.priority;
    });

    document.addEventListener("submit", (event) => {
      if (!event.target.classList.contains("edit", "task-form")) return;

      event.preventDefault();
      const editForm = event.target;
      const taskId = Number(editForm.dataset.taskId);
      const formData = new FormData(editForm);

      const updates = {
        title: formData.get("edit-task-title").trim(),
        description: formData.get("edit-task-description").trim(),
        dueDate: formData.get("edit-task-date"),
        priority: formData.get("edit-task-priority"),
      };

      if (!updates.title) {
        alert("Task title cannot be empty!");
        return;
      } else if (updates.title.length > 50) {
        alert("Task title cannot exceed 50 characters!");
        return;
      } else if (updates.description.length > 250) {
        alert("Task description cannot exceed 250 characters!");
      }

      this.setupEditTaskHandler(taskId, updates);

      const projectTitleLabel = document.getElementById("project-title");
      console.log(projectTitleLabel.dataset.projectId);
      if (
        !projectTitleLabel.dataset.projectId ||
        projectTitleLabel.dataset.projectId === 0
      ) {
        renderTasks(this.taskManager.getTasks());
      } else {
        const updatedTask = this.taskManager.getTaskById(taskId);
        const projectId = updatedTask.projectId;
        renderTasks(this.taskManager.getTasksByProject(projectId));
      }
    });

    document.addEventListener("change", (event) => {
      if (!event.target.classList.contains("task-tile-status")) return;

      const taskTile = event.target.closest(".task-tile");
      const taskId = Number(taskTile.dataset.taskId);
      const task = this.taskManager.getTaskById(taskId);

      if (!task) return;

      const newStatus = event.target.checked;
      const updates = { checklist: newStatus };

      this.setupEditTaskHandler(taskId, updates);

      const projectTitleLabel = document.getElementById("project-title");
      console.log(projectTitleLabel.dataset.projectId);
      if (
        !projectTitleLabel.dataset.projectId ||
        projectTitleLabel.dataset.projectId === 0
      ) {
        renderTasks(this.taskManager.getTasks());
      } else {
        const updatedTask = this.taskManager.getTaskById(taskId);
        const projectId = updatedTask.projectId;
        renderTasks(this.taskManager.getTasksByProject(projectId));
      }
    });
  }

  setupEditTaskHandler = (taskId, updates) => {
    this.taskManager.editTask(taskId, updates);
  };

  setupTaskFormCancel = () => {
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("task-button-cancel")) {
        event.preventDefault();
        let form;
        if (event.target.classList.contains("add")) {
          form = document.getElementById("add-task-form");
          form.style.display = "none";
        } else if (event.target.classList.contains("edit")) {
          form = document.getElementById("edit-task-form");
          form.remove();
        }
      }
    });
  };

  setupTasksByProject() {
    document.addEventListener("click", (event) => {
      const project = event.target.closest(".project-list");
      if (!project) return;

      const projectId = project.dataset.projectId;
      const tasks = this.taskManager.getTasksByProject(projectId);

      const projectTitleLabel = document.getElementById("project-title");

      const projectData = this.taskManager.getProjectById(projectId);
      const projectName = projectData ? projectData.name : "My Tasks";

      projectTitleLabel.textContent = projectName;
      projectTitleLabel.dataset.projectId = projectId;
      renderTasks(tasks);
    });
  }

  setupAllTasks() {
    document.addEventListener("DOMContentLoaded", () => {
      const allTaskButton = document.getElementById("all-tasks-button");
      const projectTitleLabel = document.getElementById("project-title");
      allTaskButton.addEventListener("click", () => {
        projectTitleLabel.textContent = "My Tasks";
        projectTitleLabel.dataset.projectId = 0;
        renderTasks(this.taskManager.getTasks());
      });
    });
  }
}

export default Controller;
