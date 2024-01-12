document.addEventListener("DOMContentLoaded", () => {
    let tasks = [];
  
    document.getElementById("todoInput").addEventListener("submit", (event) => {
      event.preventDefault();
      addTask();
    });
  
    fetch("https://communal-jaybird-69.hasura.app/api/rest/todos_test", {
      headers: {
        "x-hasura-access-key":
          "Lh5FtTEIzpGcC4nWQudYRDomc8bn5mYcIAsIQMh5jkLboRHbcWMlfpvohrOEuWFn",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        tasks = data.todos;
        renderTasks();
      });
  
    const tasksPerPage = 10;
    let currentPage = 1;
  
    const renderTasks = () => {
      const startIndex = (currentPage - 1) * tasksPerPage;
      const endIndex = startIndex + tasksPerPage;
      const tasksToRender = tasks.slice(startIndex, endIndex);
      const todoList = document.getElementById("todoList");
      todoList.innerHTML = "";
  
      tasksToRender.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
                  <div class="userInfoPublic">${task.username}</div>
                  <div class="labelContent">
                      <div>${task.task}</div>
                  </div>
              `;
        todoList.appendChild(li);
      });
    };
  
    document.getElementById("loadMore").addEventListener("click", () => {
      currentPage++;
      renderTasks();
    });
  
    const defaultUsername = "Suphawat_Sujai";
    function addTask() {
      const labelInput = document.getElementById("taskLabel");
      const task = labelInput.value;
  
      if (task.trim() !== "") {
        const newTask = {
          username: defaultUsername,
          task,
        };
  
        fetch("https://communal-jaybird-69.hasura.app/api/rest/createtodos", {
          headers: {
            "x-hasura-access-key":
              "Lh5FtTEIzpGcC4nWQudYRDomc8bn5mYcIAsIQMh5jkLboRHbcWMlfpvohrOEuWFn",
          },
          method: "POST",
          body: JSON.stringify(newTask),
        })
          .then((res) => res.json())
          .then(() => {
            tasks = [newTask, ...tasks];
            renderTasks();
          });
      }
    }
  });
  