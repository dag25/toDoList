

const toDoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const toDoList = document.querySelector('.todo-list');
const toDoCompleted = document.querySelector('.todo-completed');

let toDoData = [];
let data = localStorage.getItem('toDoData', toDoData);

if(data) {
  toDoData = JSON.parse(data);
}
console.log(toDoData);

const render = function(){
  toDoList.innerHTML = '';
  toDoCompleted.innerHTML = '';

  toDoData.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' +item.text +'</span>' +
    '<div class="todo-buttons">' +
    '<button class="todo-remove"></button>' +
    '<button class="todo-complete"></button>' +
    '</div>'

    if (item.completed) {
      toDoCompleted.append(li);
    }else {
      toDoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', function(){
      item.completed = !item.completed;
      render();
    });

    li.querySelector('.todo-remove').addEventListener('click', function(){
      const index = toDoData.indexOf(item);
      toDoData.splice(index, 1);
      render();
    });
    console.log(toDoData);
    localStorage.setItem('toDoData', JSON.stringify(toDoData));
  });
}
window.addEventListener('load', render);
toDoControl.addEventListener('submit', function(event){
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
  }

  if (newToDo.text.trim() === '') {
    return;
  }

  toDoData.push(newToDo);
  headerInput.value = '';


  render();
});
