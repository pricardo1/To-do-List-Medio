const input = document.querySelector('.input')
const addBtn = document.querySelector('.add')
const container = document.querySelector('.container')

function addTarefa(nome) {
    const itemTarefa = document.createElement('div')
    itemTarefa.classList.add('item')

    const inputTarefa = document.createElement('input')
    inputTarefa.type = 'text'
    inputTarefa.disabled = true
    inputTarefa.value = nome
    inputTarefa.classList.add('item-input')

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.innerText = '✏️'
    editBtn.addEventListener('click', () => editTarefa(inputTarefa, nome))

    const removeBtn = document.createElement('button')
    removeBtn.classList.add('remove')
    removeBtn.innerText = '❌'
    removeBtn.addEventListener('click', () => removerTarefa(itemTarefa, nome))

    container.append(itemTarefa)
    itemTarefa.append(inputTarefa)
    itemTarefa.append(editBtn)
    itemTarefa.append(removeBtn)
}

function editTarefa (inputTarefa, nome) {
    inputTarefa.disabled = !inputTarefa.disabled
    if(!inputTarefa.disabled) {
        const index = todos.indexOf(nome)
        todos[index] = inputTarefa.value
        saveTodos()
    }

}

function removerTarefa (item, nome) {
    item.parentNode.removeChild(item)
    const index = todos.indexOf(nome)
    todos.splice(index, 1)
    saveTodos()

}

function checkInput () {
    const inputValue = input.value
    if (inputValue !== '') {
        addTarefa(inputValue)
        todos.push(inputValue)
        //salvando no LocalStorage
        saveTodos()
        input.value = ''
        input.focus()

    }
}
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

addBtn.addEventListener('click', checkInput)
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkInput()
    }
})

const todos = JSON.parse(localStorage.getItem('todos')) || []
for (const task of todos) {
    addTarefa(task)
}
