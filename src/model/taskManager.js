import Project from "./project";
import Task from "./task";

class TaskManager {
  constructor() {
    this.projects = [];
    this.tasks = [];
    this.projectIdCounter = 1;
    this.taskIdCounter = 1;
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    localStorage.setItem("projectIdCounter", this.projectIdCounter);
    localStorage.setItem("taskIdCounter", this.taskIdCounter);
  }

  loadFromLocalStorage() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.projectIdCounter = Number(localStorage.getItem("projectIdCounter")) || 1;
    this.taskIdCounter = Number(localStorage.getItem("taskIdCounter")) || 1;

    this.projects = projects.map(
      (p) => new Project(p.id, p.name) // Sesuaikan dengan struktur Project
    );
    this.tasks = tasks.map(
      (t) =>
        new Task(
          t.id,
          t.projectId,
          t.title,
          t.description,
          t.dueDate,
          t.priority,
          t.checklist
        )
    );
  }

  addProject(name) {
    const project = new Project(this.projectIdCounter++, name);
    this.projects.push(project);
    this.saveToLocalStorage();
    return project;
  }

  editProject(projectId, updates) {
    const project = this.projects.find((p) => p.id === projectId);
    if (project) {
      Object.assign(project, updates);
      this.saveToLocalStorage();
    }
  }

  deleteProject(projectId) {
    this.tasks = this.tasks.filter((task) => task.projectId !== projectId);
    this.projects = this.projects.filter((project) => project.id !== projectId);
    this.saveToLocalStorage();
  }

  addTask(projectId, title, description, dueDate, priority, checklist) {
    if (!this.projects.some((p) => p.id === projectId)) {
      alert("Project not found.");
      return null;
    }
    const task = new Task(
      this.taskIdCounter++,
      projectId,
      title,
      description,
      dueDate,
      priority,
      checklist
    );
    this.tasks.push(task);
    this.saveToLocalStorage();
    return task;
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveToLocalStorage();
  }

  editTask(taskId, updates) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      Object.assign(task, updates);
      this.saveToLocalStorage();
    }
  }

  getProjects() {
    return this.projects;
  }

  getProjectById(projectId) {
    return this.projects.find((p) => p.id === Number(projectId)) || null;
  }

  getTasks() {
    return this.tasks;
  }

  getTasksByProject(projectId) {
    return this.tasks.filter((task) => task.projectId === Number(projectId));
  }

  getTaskById(taskId) {
    return this.tasks.find((task) => task.id === Number(taskId)) || null;
  }
}

export default TaskManager;
