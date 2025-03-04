import "../view/styles.css";
import TaskManager from "../model/taskManager.js";
import Controller from "./Controller.js";
import { renderProjects, renderTasks } from "../view/render.js";

const taskManager = new TaskManager();
const controller = new Controller(taskManager);

renderProjects(taskManager.getProjects());
renderTasks(taskManager.getTasks());
