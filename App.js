let appElement = document.querySelector("#app");
let listElement = document.querySelector(".list__ul");
let labelElement = document.querySelector(".form label");
let inputElement = document.querySelector(".form input");
let btnElement = document.querySelector(".form button");
let langElements = document.querySelectorAll("input[type='radio']");
let dragged;
let draggedPosition;

let todos = JSON.parse(localStorage.getItem('list_todos')) || [];
let LANGUAGE = localStorage.getItem('language') || getLanguage();

langElements.forEach((langElement) => {
    if(langElement.value === LANGUAGE){
        langElement.checked = true;
    }
    langElement.addEventListener('change', (e) => {
        //console.log(e.target.value);
        LANGUAGE = e.target.value;
        toggleLanguage();
    });
});


const CLASSES = ['purple','yellow', 'green', 'lightBlue', ''];

const STRING = {
    "en-US": {
        labelCorrect: "Type a todo",
        labelIncorrect: "There is the same value",
        buttonTxt: "Add",
        inputTitle: "Type a note here",
        messageTexts: [
            "Empty value", 
            "There is the same value", 
            "Value was added sucessful", 
            "Value was removed sucessful",
            "Values were removed sucessful"
        ],
    },
    "pt-BR": {
        labelCorrect: "Digite um todo",
        labelIncorrect: "Valor repetido",
        buttonTxt: "Adicionar",
        inputTitle: "Insira um bilhete aqui",
        messageTexts: [
            "Sem valor", 
            "Valor repetido", 
            "Valor adicionado com sucesso", 
            "Valor removido com sucesso",
            "Valores removidos com sucesso"
        ],
    }
};

window.addEventListener('load', () => {
    for(todo of todos)
        addNote(todo);
});

function random(length){
    return Math.floor(Math.random() * Math.floor(length));
}

function validateInput() {
    var todoText = inputElement.value;

    if (todoText == '') {
        alertMessage(STRING[LANGUAGE].messageTexts[0], "#ef6161");
    }
    else if(todos.includes(todoText)){
        alertMessage(STRING[LANGUAGE].messageTexts[1], "#bba836");
    }
    else{
        alertMessage(STRING[LANGUAGE].messageTexts[2], "#219a55");
        todos.push(todoText);
        inputElement.value = '';
        addNote(todoText);
        saveToStorage();
    }
}

labelElement.textContent = STRING[LANGUAGE].labelCorrect;

btnElement.textContent = STRING[LANGUAGE].buttonTxt;

btnElement.addEventListener("click", (e) => {
    e.preventDefault();
    validateInput();
});

inputElement.placeholder = STRING[LANGUAGE].labelCorrect;

inputElement.title = STRING[LANGUAGE].inputTitle;

inputElement.lang = LANGUAGE;

inputElement.addEventListener("keydown", (e) => {
    if(e.key == 'Enter'){
        validateInput();
        btnElement.classList.add("active");
        setTimeout(() => {btnElement.classList.remove("active")}, 500);
    }
});

inputElement.addEventListener('dragover', (e) => {
    e.preventDefault();
})

inputElement.addEventListener("drop", (e) => {
    e.preventDefault();
    removeNote(draggedPosition);
    e.target.value = dragged.textContent.replace("X","");
    draggedPosition = null;
});

inputElement.addEventListener("input", (e) => {
    var label = document.querySelector(".form label");
    var inputValue = e.target.value;

    if(verifyInput(inputValue)){
        label.textContent = STRING[LANGUAGE].labelIncorrect;
        label.style.color = "#fbd208";
        inputElement.style.borderColor = "#fbd208";
    }
    else{
        label.textContent = STRING[LANGUAGE].labelCorrect;
        label.style.color = "#fff";
        inputElement.style.borderColor = "#fff";
    }
});

function verifyInput(text){
    return todos.includes(text);
}

function eventDrag() {
    var itensElements = document.querySelectorAll(".list__ul li");

    itensElements.forEach((itemElement) => {
        itemElement.addEventListener('dragstart', (e) => {
            dragged = e.target.cloneNode(true);
            NUMBER = 0;
            for(element of e.target.parentNode.children){
                if(element.innerHTML === dragged.innerHTML)
                draggedPosition = NUMBER;    
                NUMBER++;
            }
        });
    });
}

function eventClick(){
    var linkElements = document.querySelectorAll(".list__ul li a");

    linkElements.forEach((linkElement) => {
        linkElement.addEventListener('click', (e) => {
            //console.log(e.target.parentNode);
            removeNote(e.target.getAttribute('data-pos'))
        });
    });
}

function addNote(inputText){
    var todoElement = document.createElement('li');
    var todoText = document.createTextNode(inputText);
    var linkElement = document.createElement('a');
    var linkText = document.createTextNode('X');
    var pos = todos.indexOf(inputText);
    
    linkElement.setAttribute('href', '#');
    linkElement.setAttribute('data-pos', pos);
    linkElement.appendChild(linkText);

    todoElement.setAttribute('draggable', 'true');
    todoElement.className = CLASSES[random(CLASSES.length)];
    todoElement.classList.add('adding');
    todoElement.appendChild(todoText);
    todoElement.appendChild(linkElement);
    
    listElement.appendChild(todoElement);

    eventDrag();
    eventClick();
}

function removeNote(pos){
    todos.splice(pos, 1);
    alertMessage(STRING[LANGUAGE].messageTexts[3], "green");
    pos++;
    var todoElement = document.querySelector(".list__ul li:nth-child("+pos+")");
    removeAnimation(todoElement);
    setTimeout(() => {todoElement.remove()}, 10);
    eventClick();

    saveToStorage();
}

function removeAll() {
    alertMessage(STRING[LANGUAGE].messageTexts[4], "green");
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}

function getLanguage(){
    return navigator.language || navigator.userLanguage; 
}

function alertMessage(message, color){
    var alertDiv = document.createElement("div");
    alertDiv.setAttribute('class', 'show');
    alertDiv.style.backgroundColor = color;
    
    var alertTxt = document.createTextNode(message);

    alertDiv.appendChild(alertTxt);
    appElement.appendChild(alertDiv);
}

function removeMenssage(){
    var alertDiv = document.querySelector(".show");
    if(alertDiv) appElement.removeChild(alertDiv);
}

function removeAnimation(element){
    //console.log(element);
    element.classList.remove('adding');
    element.classList.add('remove');
}

function toggleLanguage(){
    localStorage.setItem('language', LANGUAGE);
    location.reload();
}