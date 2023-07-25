function getTasks() {
    var tasks = localStorage.getItem('tasks');
    if (tasks) {
      return JSON.parse(tasks);
    } else {
      return [];
    }
  }

  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function addTask(task) {
    var tasks = getTasks();
    tasks.push({ title: task, completed: false });
    saveTasks(tasks);
    displayTasks();
  }

  function toggleTask(taskIndex) {
    var tasks = getTasks();
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks(tasks);
    displayTasks();
  }

  function removeTask(taskIndex) {
    var tasks = getTasks();
    tasks.splice(taskIndex, 1);
    saveTasks(tasks);
    displayTasks();
  }

  function displayTasks() {
    var tasks = getTasks();
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i];
      var taskItem = document.createElement('div');
      taskItem.className = 'task-item';

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', function() {
        var taskIndex = parseInt(this.getAttribute('data-index'));
        toggleTask(taskIndex);
      });

      var label = document.createElement('label');
      label.textContent = task.title;

      taskItem.appendChild(checkbox);
      taskItem.appendChild(label);
      taskList.appendChild(taskItem);

      var removeButton = document.createElement('button');
      removeButton.className = 'remove-button';
      removeButton.textContent = 'Remove';
      removeButton.setAttribute('data-index', i);
      removeButton.addEventListener('click', function() {
        var taskIndex = parseInt(this.getAttribute('data-index'));
        removeTask(taskIndex);
      });

      taskItem.appendChild(removeButton);
    }
  }

  var taskForm = document.getElementById('taskForm');
  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var taskInput = document.getElementById('taskInput');
    var task = taskInput.value;
    addTask(task);
    taskInput.value = '';
  });

  displayTasks();