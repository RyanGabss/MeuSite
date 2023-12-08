document.addEventListener("DOMContentLoaded", function () {
  const projectInput = document.querySelector(".new.list");
  const projectCreateButton = document.querySelector(".btn.create-project");
  const taskInput = document.querySelector(".new.task");
  const taskCreateButton = document.querySelector(".new-task-creator .create-task");
  const deleteCompletedButton = document.querySelector(".btn.delete-stuff:nth-child(1)");
  const deleteTasksButton = document.querySelector(".btn.delete-stuff:nth-child(2)");
  const deleteProjectButton = document.querySelector(".delete-project");
  const taskList = document.querySelector(".todo-list .tasks");
  const projectList = document.querySelector(".task-list");
  let projects = {};

  // Função para criar um novo projeto
  projectCreateButton.addEventListener("click", function (e) {
    e.preventDefault();
    const projectName = projectInput.value.trim();
    if (projectName !== "") {
      projects[projectName] = [];
      const projectListItem = document.createElement("li");
      projectListItem.classList.add("list-name");
      projectListItem.textContent = projectName;
      projectListItem.addEventListener("click", function () {
        setActiveProject(projectName);
      });
      projectList.appendChild(projectListItem);
      projectInput.value = "";
      deleteProjectButton.style.display = "inline-block"; // Mostrar o botão após a criação do projeto
    }
  });

  // Função para deletar um projeto e suas tarefas
  deleteProjectButton.addEventListener("click", function () {
    const projectName = document.querySelector(".list-title").textContent;
      if (confirm(`Tem certeza que deseja deletar o projeto "${projectName}" e suas tarefas?`)) {
        deleteProject(projectName);  
      }//if (projects.lenght = 0) {
      
    //}
  });

  // Função para criar uma nova tarefa
  taskCreateButton.addEventListener("click", function (e) {
    e.preventDefault();
    const taskName = taskInput.value.trim();
    if (taskName !== "") {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task");
      // Crie um input do tipo checkbox
      const checkboxInput = document.createElement("input");
      checkboxInput.type = "checkbox";
      checkboxInput.id = `task-${Math.floor(Math.random() * 1000) + 1}`;
      // Crie a label associada ao checkbox
      const taskLabel = document.createElement("label");
      taskLabel.setAttribute("for", checkboxInput.id);
      taskLabel.innerHTML = `
        <span class="custom-checkbox"></span>
        ${taskName}
      `;
      // Crie o botão de exclusão da tarefa
      const deleteTaskButton = document.createElement("button");
      deleteTaskButton.classList.add("btn", "delete");
      deleteTaskButton.textContent = "Deletar";
      deleteTaskButton.addEventListener("click", function () {
        // Deletar tarefa
        taskItem.remove();
      });
      // Adicione os elementos à tarefa
      taskItem.appendChild(checkboxInput);
      taskItem.appendChild(taskLabel);
      taskItem.appendChild(deleteTaskButton);
      taskList.appendChild(taskItem);
      taskInput.value = "";
    }
  });

  // Função para deletar um projeto e suas tarefas
  function deleteProject(projectName) {
    if (projects.hasOwnProperty(projectName)) {
      delete projects[projectName];
      renderProjects();
      const activeProjectName = document.querySelector(".list-title").textContent;
      if (activeProjectName === projectName) {
        document.querySelector(".list-title").textContent = "";
        taskList.innerHTML = "";
      }
    }
  }

  // Função para renderizar a lista de projetos
  function renderProjects() {
    const projectNames = Object.keys(projects);
    projectList.innerHTML = "";
    projectNames.forEach((projectName) => {
      const projectListItem = document.createElement("li");
      projectListItem.classList.add("list-name");
      deleteProjectButton.style.display = "block";
      projectListItem.textContent = projectName;
      projectListItem.addEventListener("click", function () {
        setActiveProject(projectName);
      });
      projectList.appendChild(projectListItem);
    });
  }

  // Função para definir o projeto ativo e exibir suas tarefas
  function setActiveProject(projectName) {
    const projectTitle = document.querySelector(".list-title");
    projectTitle.textContent = projectName;

    // Limpar a lista de tarefas
    taskList.innerHTML = "";

    // Preencher a lista de tarefas com as tarefas do projeto selecionado
    projects[projectName].forEach((taskName) => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task");
      const checkboxInput = document.createElement("input");
      checkboxInput.type = "checkbox";
      checkboxInput.id = `task-${Math.floor(Math.random() * 1000) + 1}`;
      const taskLabel = document.createElement("label");
      taskLabel.setAttribute("for", checkboxInput.id);
      taskLabel.innerHTML = `
        <span class="custom-checkbox"></span>
        ${taskName}
      `;
      const deleteTaskButton = document.createElement("button");
      deleteTaskButton.classList.add("btn", "delete");
      deleteTaskButton.textContent = "Deletar";
      deleteTaskButton.addEventListener("click", function () {
        // Deletar tarefa
        taskItem.remove();
        // Remover a tarefa do projeto
        const taskIndex = projects[projectName].indexOf(taskName);
        if (taskIndex !== -1) {
          projects[projectName].splice(taskIndex, 1);
        }
      });
      taskItem.appendChild(checkboxInput);
      taskItem.appendChild(taskLabel);
      taskItem.appendChild(deleteTaskButton);
      taskList.appendChild(taskItem);
    });
  }

  // Inicialmente, defina o projeto ativo para o primeiro projeto
  renderProjects();
});
