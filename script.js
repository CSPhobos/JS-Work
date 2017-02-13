/********************************
Vanilla JS TodoList script.js
---------------------------------
Author: Ian Harker
Date: 2017/02/13
********************************/
var todoList = {
  todos: [],
  addTodo: function(todoText){
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    view.displayTodos();
  },
  changeTodo: function(position, change) {
    if(this.todos[position] === undefined)
    {
      return false;
    }
    else {
      this.todos[position].todoText = change;
      view.displayTodos();
    }
  },
  deleteTodo: function(position) {
    this.todos.splice(position,1);
  },
  toggleTodo: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    this.todos.forEach(function(todo) {
      if(todo.completed === true)
      {
        completedTodos++;
      }
    });
    
    // process each todo 
    this.todos.forEach(function(todo) {
      //make everything false
      if(completedTodos === totalTodos) {
        todo.completed = false;
      }
      //else make everything true
      else {
        todo.completed = true;
      }
    }); // todo forEach()
    
    view.displayTodos();
  } // toggleAll
}; //todoList

var handlers = {
  displayTodos: function(){
    view.displayTodos();
  },
  toggleAll: function(){
    todoList.toggleAll();
  },
  addTodo: function(){
    var todoText = document.getElementById("addTodoTextInput");
    todoList.addTodo(todoText.value);
    todoText.value = '';
  },
  toggleTodo: function(position){
    todoList.toggleTodo(position);
    view.displayTodos();
  },
  changeTodo: function(){
    var ele = document.getElementById("chgTodoNum");
    var text = document.getElementById("chgTodoText");
    todoList.changeTodo(ele.valueAsNumber-1,text.value);
    ele.value = '';
    text.value= '';
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  }
};

var view = {
  displayTodos: function(){
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    //foreach(callback, this)
    todoList.todos.forEach(function(todo,position){
      var todoLi = document.createElement('li');
      todoLi.className = (todo.completed?"completed":"incompleted")
      todoLi.innerHTML ="<b>" + todo.todoText + "</b> <small>(" + (todo.completed?"complete":"incomplete") + ")</small>";
      todoLi.id = position;
      todoLi.appendChild(this.createToggleButton());
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    },this);
  },
  createDeleteButton: function(){
    var delBtn = document.createElement("button");
    delBtn.className="btnDelete";
    delBtn.textContent="Delete";
    delBtn.style="float:right;";
    return delBtn;
  },
  createToggleButton: function(){
    var toggleBtn = document.createElement("button");
    toggleBtn.className="btnToggle";
    toggleBtn.textContent="Toggle";
    toggleBtn.style="float:right;";
    return toggleBtn;
  },
  setupEventListeners: function() {
    var todosUl = document.querySelector("ul");
    var addTodoInputElement = document.getElementById("addTodoTextInput");
    
    // Delete Button Handling
    todosUl.addEventListener("click", function(event) {
      var clickedElement = event.target;
      if(clickedElement.className === 'btnDelete') {
        handlers.deleteTodo(clickedElement.parentNode.id);
      }
    });
    
    // Toggle Button Handling
    todosUl.addEventListener("click", function(event) {
      var clickedElement = event.target;
      if(clickedElement.className === 'btnToggle') {
        handlers.toggleTodo(clickedElement.parentNode.id);
      }
    });
    
    //Enter key handling
    addTodoInputElement.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode == 13) {
          document.getElementById("btnAddTodos").click();
      }
    });
  }
};

view.setupEventListeners();