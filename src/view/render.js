export const renderProjects = (projects) => {
  const projectContent = document.getElementById("project-content");
  projectContent.innerHTML = "";

  projects.forEach((project) => {
    const projectList = document.createElement("div");
    projectList.classList.add("project-list");
    projectList.dataset.projectId = project.id;

    const projectListTitle = document.createElement("div");
    projectListTitle.classList.add("project-list-title");

    const projectListIcon = document.createElement("span");
    projectListIcon.classList.add("material-symbols-outlined");
    projectListIcon.classList.add("project-list-icon");
    projectListIcon.textContent = "folder";

    const projectListLabel = document.createElement("label");
    projectListLabel.classList.add("project-list-label");
    projectListLabel.textContent = project.name;

    projectListTitle.appendChild(projectListIcon);
    projectListTitle.appendChild(projectListLabel);

    const projectListButton = document.createElement("div");
    projectListButton.classList.add("project-list-button");

    const projectListEditButton = document.createElement("button");
    projectListEditButton.classList.add("project-list-edit-button");
    projectListEditButton.textContent = "Edit";

    const projectListDeleteButton = document.createElement("button");
    projectListDeleteButton.classList.add("project-list-delete-button");
    projectListDeleteButton.textContent = "Delete";

    projectListButton.appendChild(projectListEditButton);
    projectListButton.appendChild(projectListDeleteButton);

    projectList.appendChild(projectListTitle);
    projectList.appendChild(projectListButton);

    projectContent.appendChild(projectList);
  });
};

export const renderProjectById = (project) => {
  const projectList = document.createElement("div");
  projectList.classList.add("project-list");
  projectList.dataset.projectId = project.id;

  const projectListTitle = document.createElement("div");
  projectListTitle.classList.add("project-list-title");

  const projectListIcon = document.createElement("span");
  projectListIcon.classList.add(
    "material-symbols-outlined",
    "project-list-icon"
  );
  projectListIcon.textContent = "folder";

  const projectListLabel = document.createElement("label");
  projectListLabel.classList.add("project-list-label");
  projectListLabel.textContent = project.name;

  projectListTitle.appendChild(projectListIcon);
  projectListTitle.appendChild(projectListLabel);

  const projectListButton = document.createElement("div");
  projectListButton.classList.add("project-list-button");

  const projectListEditButton = document.createElement("button");
  projectListEditButton.classList.add("project-list-edit-button");
  projectListEditButton.textContent = "Edit";

  const projectListDeleteButton = document.createElement("button");
  projectListDeleteButton.classList.add("project-list-delete-button");
  projectListDeleteButton.textContent = "Delete";

  projectListButton.appendChild(projectListEditButton);
  projectListButton.appendChild(projectListDeleteButton);

  projectList.appendChild(projectListTitle);
  projectList.appendChild(projectListButton);

  return projectList;
};

export const renderTasks = (tasks) => {
  const taskContent = document.getElementById("task-content");
  taskContent.innerHTML = "";

  tasks.forEach((task) => {
    const taskTile = document.createElement("div");
    taskTile.classList.add("task-tile");
    taskTile.classList.add(task.priority);
    task.checklist ? taskTile.classList.add("closed") : null;
    taskTile.dataset.taskId = task.id;

    const taskTileDetail = document.createElement("div");
    taskTileDetail.classList.add("task-tile-detail");

    const taskTilePriority = document.createElement("span");
    taskTilePriority.classList.add("task-tile-priority");

    const taskTileStatus = document.createElement("input");
    taskTileStatus.type = "checkbox";
    taskTileStatus.name = "task-tile-status";
    taskTileStatus.id = "task-tile-status";
    taskTileStatus.classList.add("task-tile-status");
    taskTileStatus.checked = task.checklist;

    const taskTileLabel = document.createElement("div");
    taskTileLabel.classList.add("task-tile-label");

    const taskTileTitle = document.createElement("span");
    taskTileTitle.classList.add("task-tile-title");
    taskTileTitle.textContent = task.title;

    const taskTileDescription = document.createElement("span");
    taskTileDescription.classList.add("task-tile-description");
    taskTileDescription.textContent = task.description;

    taskTileLabel.appendChild(taskTileTitle);
    taskTileLabel.appendChild(taskTileDescription);

    taskTileDetail.appendChild(taskTilePriority);
    taskTileDetail.appendChild(taskTileStatus);
    taskTileDetail.appendChild(taskTileLabel);

    const taskTileAction = document.createElement("div");
    taskTileAction.classList.add("task-tile-action");

    const taskTileDate = document.createElement("span");
    taskTileDate.classList.add("task-tile-date");
    taskTileDate.textContent = task.dueDate;

    const taskTileEditButton = document.createElement("span");
    taskTileEditButton.classList.add("material-symbols-outlined");
    taskTileEditButton.classList.add("task-tile-edit-button");
    taskTileEditButton.id = "task-tile-edit-button";
    taskTileEditButton.textContent = "edit_square";

    const taskTileDeleteButton = document.createElement("span");
    taskTileDeleteButton.classList.add("material-symbols-outlined");
    taskTileDeleteButton.classList.add("task-tile-delete-button");
    taskTileDeleteButton.id = "task-tile-delete-button";
    taskTileDeleteButton.textContent = "delete";

    taskTileAction.appendChild(taskTileDate);
    taskTileAction.appendChild(taskTileEditButton);
    taskTileAction.appendChild(taskTileDeleteButton);

    taskTile.appendChild(taskTileDetail);
    taskTile.appendChild(taskTileAction);

    taskContent.appendChild(taskTile);
  });
};

export const editProjectForm = (project) => {
  const editProjectForm = document.createElement("form");
  editProjectForm.classList.add("project-list", "edit-project-form");
  editProjectForm.id = "edit-project-form";
  editProjectForm.dataset.projectId = project.id;

  const projectListTitle = document.createElement("div");
  projectListTitle.classList.add("project-list-title");

  const projectListIcon = document.createElement("span");
  projectListIcon.classList.add(
    "material-symbols-outlined",
    "project-list-icon"
  );
  projectListIcon.textContent = "folder";

  const projectListInput = document.createElement("input");
  projectListInput.type = "text";
  projectListInput.name = "project-list-edit-input";
  projectListInput.id = "project-list-edit-input";
  projectListInput.classList.add("project-list-edit-input");
  projectListInput.value = project.name;

  projectListTitle.append(projectListIcon, projectListInput);

  const projectListButton = document.createElement("div");
  projectListButton.classList.add("project-list-button");

  const projectListEditButton = document.createElement("button");
  projectListEditButton.type = "submit";
  projectListEditButton.classList.add("edit");
  // projectListEditButton.classList.add("project-list-edit-button");
  projectListEditButton.textContent = "Save";

  const projectListDeleteButton = document.createElement("button");
  projectListDeleteButton.type = "button";
  projectListDeleteButton.classList.add("edit");
  projectListDeleteButton.classList.add("project-list-cancel-button");
  projectListDeleteButton.textContent = "Cancel";
  
  projectListButton.appendChild(projectListEditButton);
  projectListButton.appendChild(projectListDeleteButton);

  editProjectForm.append(projectListTitle, projectListButton);

  return editProjectForm;
};

export const editTaskForm = (task) => {
  const form = document.createElement("form");
  form.classList.add("edit");
  form.classList.add("task-form");
  form.id = "edit-task-form";
  form.dataset.taskId = task.id;

  const formDivide = document.createElement("div");
  formDivide.classList.add("edit");
  formDivide.classList.add("task-form-divide");

  const formLeft = document.createElement("div");
  formLeft.classList.add("edit");
  formLeft.classList.add("task-form-left");

  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "edit-task-title");
  titleLabel.textContent = "Title:";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "edit-task-title";
  titleInput.id = "edit-task-title";
  titleInput.classList.add("edit");
  titleInput.classList.add("task-title");
  titleInput.value = task.title;

  const descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "edit-task-description");
  descriptionLabel.textContent = "Description:";

  const descriptionInput = document.createElement("textarea");
  descriptionInput.name = "edit-task-description";
  descriptionInput.id = "edit-task-description";
  descriptionInput.classList.add("edit");
  descriptionInput.classList.add("task-description");
  descriptionInput.value = task.description;

  formLeft.append(titleLabel, titleInput, descriptionLabel, descriptionInput);

  const formRight = document.createElement("div");
  formRight.classList.add("edit");
  formRight.classList.add("task-form-right");

  const dateLabel = document.createElement("label");
  dateLabel.setAttribute("for", "edit task-date");
  dateLabel.textContent = "Date:";

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.name = "edit-task-date";
  dateInput.id = "edit-task-date";
  dateInput.classList.add("edit");
  dateInput.classList.add("task-date");
  dateInput.value = task.dueDate;

  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "edit-task-priority");
  priorityLabel.textContent = "Priority:";

  const prioritySelect = document.createElement("select");
  prioritySelect.name = "edit-task-priority";
  prioritySelect.id = "edit-task-priority";
  prioritySelect.classList.add("edit");
  prioritySelect.classList.add("task-priority");

  ["low", "medium", "high"].forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority;
    option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);

    if (task.priority === priority) {
      option.selected = true;
    }

    prioritySelect.appendChild(option);
  });

  formRight.append(dateLabel, dateInput, priorityLabel, prioritySelect);

  formDivide.append(formLeft, formRight);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("edit");
  buttonDiv.classList.add("task-button");

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.classList.add("edit");
  addButton.classList.add("task-button-add");
  addButton.textContent = "Save";

  const resetButton = document.createElement("button");
  resetButton.type = "reset";
  resetButton.classList.add("edit");
  resetButton.classList.add("task-button-reset");
  resetButton.textContent = "Reset";

  const removeButton = document.createElement("button");
  removeButton.classList.add("edit");
  removeButton.classList.add("task-button-cancel");
  removeButton.textContent = "Cancel";

  buttonDiv.append(addButton, resetButton, removeButton);

  form.append(formDivide, buttonDiv);

  return form;
};
