class Task {
  constructor(id, projectId, title, description, dueDate, priority, checklist) {
    this.id = id;
    this.projectId = projectId;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
  }
}

export default Task;
