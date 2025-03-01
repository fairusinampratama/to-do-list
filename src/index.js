import "./styles.css";

const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    modeToggle.innerHTML =
      '<span class="material-symbols-outlined"> light_mode </span>';
  } else {
    localStorage.setItem("theme", "light");
    modeToggle.innerHTML =
      '<span class="material-symbols-outlined"> dark_mode </span>';
  }
});

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  modeToggle.innerHTML =
    '<span class="material-symbols-outlined"> light_mode </span>';
}

document.addEventListener("DOMContentLoaded", function () {
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
});
