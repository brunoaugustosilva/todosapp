
var appElement = document.querySelector("#app");
var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var btnElement = document.querySelector("#app button");

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {
    listElement.innerHTML = '';

    for(todo of todos){
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        var linkElement = document.createElement('a');

        linkElement.setAttribute('href', '#');

        var pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')')

        var linkText = document.createTextNode('Excluir');

        linkElement.appendChild(linkText);

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);

        listElement.appendChild(todoElement);
    }
} 

renderTodos();

function addTodo() {
    var todoText = inputElement.value;
    
    removerMensagem();

    if (todoText == '') {
        mensagemAlerta("Sem valor", "red");
    }
    else{
        todos.push(todoText);
        inputElement.value = '';
        mensagemAlerta("Valor adicionado com sucesso", "green");
        renderTodos();
        saveToStorage();
    }
}

btnElement.onclick = addTodo;

function deleteTodo(pos) {
    todos.splice(pos, 1);
    mensagemAlerta("Valor removido com sucesso", "green");
    renderTodos();
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}

function mensagemAlerta(mensagem, color){
    var divAlerta = document.createElement("div");
    divAlerta.setAttribute('class', 'show');
    divAlerta.style.backgroundColor = color;
    
    var alertaTexto = document.createTextNode(mensagem);

    divAlerta.appendChild(alertaTexto);
    appElement.appendChild(divAlerta);
}

function removerMensagem(){
    var divAlerta = document.querySelector(".show");
    if(divAlerta) appElement.removeChild(divAlerta);
}