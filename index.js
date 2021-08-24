document.addEventListener('DOMContentLoaded', () => { 
  renderTaskList()
  refreshButton()
})

const renderTaskList = () => {
  const taskForm = document.querySelector('#task-input-form')
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const toDoList = document.querySelector('#to-dos')

    const newToDo = document.createElement('li')
    newToDo.textContent = document.querySelector('#new-input').value        
  
    const toDoButton = document.createElement('button')
    toDoButton.addEventListener('click', handleDelete)
    toDoButton.id = 'delete-btn'
    toDoButton.textContent = "X"

    newToDo.append(toDoButton)
    toDoList.append(newToDo)
  })
  taskForm.reset()
}

function handleDelete(e) {
  e.target.parentNode.remove();
}

const refreshButton = () => {
  const refreshButton = document.querySelector('#refresh-button')
  refreshButton.addEventListener('click', () => {
    const allLis = document.querySelectorAll('li')
    allLis.remove()
  })
}



