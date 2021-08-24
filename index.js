document.addEventListener('DOMContentLoaded', () => { 
  // add functions here
})

const taskForm = document.querySelector('#task-input-form')
taskForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const toDoContainer = document.querySelector('#to-do-container')
  const toDoList = document.createElement('ul')

  const newToDo = document.createElement('li')
  newToDo.textContent = document.querySelector('#new-input ').value
  
  const toDoButton = document.createElement('button')
  toDoButton.addEventListener('click', handleDelete)
  toDoButton.textContent = "X"

  toDoList.append(newToDo, toDoButton)
  toDoContainer.append(toDoList)
})

function handleDelete(e) {
  e.target.parentNode.remove();
}

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const newTask = document.getElementById("new-task-description");
//   const newListItem = document.createElement("li");
//   newListItem.textContent = `${listItem} `;
//   const newButton = document.createElement("button");
//   newButton.addEventListener("click", handleDelete)
//   newButton.textContent = "X";
//   newListItem.appendChild(newButton);
//   list.append(newListItem);
//   form.reset();
// })

// }