const taskForm = document.querySelector('#task-input-form')
taskForm.addEventListener('submit', (e) => createTask(e))

const createTask = (e) => {
  e.preventDefault()
  let content = taskForm.querySelector('#new-input').value
  const newTask = {content}

  fetch('http://localhost:3000/tasklist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newTask)
  }) 
  .then(res => res.json())
  .then(task => renderTaskList(task))
  .catch(error => console.error('error: ', error))
  taskForm.reset()
}

const renderTaskList = (task) => {
    const toDoList = document.querySelector('#to-dos')

    const newToDo = document.createElement('li')
    newToDo.textContent = task.content    
  
    const toDoButton = document.createElement('button')
    toDoButton.id = 'delete-btn'
    toDoButton.textContent = "X"
    toDoButton.addEventListener('click', (e) => handleDelete(e, task, newToDo))

    newToDo.append(toDoButton)
    toDoList.append(newToDo)
}

const handleDelete = (e, task, newToDo) => {
  newToDo.remove()
  fetch(`http://localhost:3000/tasklist/${task.id}`, {
    method: 'DELETE'
  })
}

const getTaskList = () => {
  fetch('http://localhost:3000/tasklist')
  .then(res => res.json())
  .then(tasks => tasks.forEach(renderTaskList))
}

// I want to delete all the newly created li elements in the json & on the page when I click on a refresh button
const refreshButton = () => {
  const refreshButton = document.querySelector('#refresh-button')
  refreshButton.addEventListener('click', () => {
    // if (confirm("Are you sure you want to refresh?")) {
    // }
    const ul = document.querySelector('#to-dos')
    ul.innerHTML = ''

    let nodes = document.querySelectorAll('li')
    nodes.forEach((node) => {

      fetch(`http://localhost:3000/tasklist/${node.id}`, {
       method: 'DELETE'
      })

    })
  })
}

const getAffirmations = () => {
fetch('http://localhost:3000/affirmations')
.then(res => res.json())
.then(data => renderAffirmations(data))
}

const renderAffirmations = (data) => {
  const affirmationsContainer = document.querySelector('#affirmations-container')
  
  const image = document.createElement('img')
  const quote = document.createElement('p')

  affirmationsContainer.append(image, quote)

  const dropDownSelect = document.querySelector('#feelings-drop-down')
  dropDownSelect.addEventListener('change', (e) => {
    if(e.target.value === 'Feeling Good') {
      image.src = data[0].image
      quote.innerText = data[0].quote
      quote.id = 'quote-id'
    } else if(e.target.value === 'Feeling Ok') {
      image.src = data[1].image
      quote.innerText = data[1].quote
      quote.id = 'quote-id'
    } else if(e.target.value === 'Not Feeling Good') {
      image.src = data[2].image
      quote.innerText = data[2].quote
      quote.id = 'quote-id'
    }
  })
}

const initialize = () => {
getTaskList()
getAffirmations()
refreshButton()
}

initialize()

