"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var appElement = document.querySelector("#app");
var listElement = document.querySelector(".list__ul");
var labelElement = document.querySelector(".form label");
var inputElement = document.querySelector(".form input");
var btnElement = document.querySelector(".form button");
var langElements = document.querySelectorAll("input[type='radio']");
var dragged;
var draggedPosition;
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];
var LANGUAGE = localStorage.getItem('language') || getLanguage();
langElements.forEach(function (langElement) {
  if (langElement.value === LANGUAGE) {
    langElement.checked = true;
  }

  langElement.addEventListener('change', function (e) {
    //console.log(e.target.value);
    LANGUAGE = e.target.value;
    toggleLanguage();
  });
});
var CLASSES = ['purple', 'yellow', 'green', 'lightBlue', ''];
var STRING = {
  "en-US": {
    labelCorrect: "Type a todo",
    labelIncorrect: "There is the same value",
    buttonTxt: "Add",
    inputTitle: "Type a note here",
    messageTexts: ["Empty value", "There is the same value", "Value was added sucessful", "Value was removed sucessful", "Values were removed sucessful"]
  },
  "pt-BR": {
    labelCorrect: "Digite um todo",
    labelIncorrect: "Valor repetido",
    buttonTxt: "Adicionar",
    inputTitle: "Insira um bilhete aqui",
    messageTexts: ["Sem valor", "Valor repetido", "Valor adicionado com sucesso", "Valor removido com sucesso", "Valores removidos com sucesso"]
  }
};
window.addEventListener('load', function () {
  var _iterator = _createForOfIteratorHelper(todos),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      todo = _step.value;
      addNote(todo);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
});

function random(length) {
  return Math.floor(Math.random() * Math.floor(length));
}

function validateInput() {
  var todoText = inputElement.value;

  if (todoText == '') {
    alertMessage(STRING[LANGUAGE].messageTexts[0], "#ef6161");
  } else if (todos.includes(todoText)) {
    alertMessage(STRING[LANGUAGE].messageTexts[1], "#bba836");
  } else {
    alertMessage(STRING[LANGUAGE].messageTexts[2], "#219a55");
    todos.push(todoText);
    inputElement.value = '';
    addNote(todoText);
    saveToStorage();
  }
}

labelElement.textContent = STRING[LANGUAGE].labelCorrect;
btnElement.textContent = STRING[LANGUAGE].buttonTxt;
btnElement.addEventListener("click", function (e) {
  e.preventDefault();
  validateInput();
});
inputElement.placeholder = STRING[LANGUAGE].labelCorrect;
inputElement.title = STRING[LANGUAGE].inputTitle;
inputElement.lang = LANGUAGE;
inputElement.addEventListener("keydown", function (e) {
  if (e.key == 'Enter') {
    validateInput();
    btnElement.classList.add("active");
    setTimeout(function () {
      btnElement.classList.remove("active");
    }, 500);
  }
});
inputElement.addEventListener('dragover', function (e) {
  e.preventDefault();
});
inputElement.addEventListener("drop", function (e) {
  e.preventDefault();
  removeNote(draggedPosition);
  e.target.value = dragged.textContent.replace("X", "");
  draggedPosition = null;
});
inputElement.addEventListener("input", function (e) {
  var label = document.querySelector(".form label");
  var inputValue = e.target.value;

  if (verifyInput(inputValue)) {
    label.textContent = STRING[LANGUAGE].labelIncorrect;
    label.style.color = "#fbd208";
    inputElement.style.borderColor = "#fbd208";
  } else {
    label.textContent = STRING[LANGUAGE].labelCorrect;
    label.style.color = "#fff";
    inputElement.style.borderColor = "#fff";
  }
});

function verifyInput(text) {
  return todos.includes(text);
}

function eventDrag() {
  var itensElements = document.querySelectorAll(".list__ul li");
  itensElements.forEach(function (itemElement) {
    itemElement.addEventListener('dragstart', function (e) {
      dragged = e.target.cloneNode(true);
      NUMBER = 0;

      var _iterator2 = _createForOfIteratorHelper(e.target.parentNode.children),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          element = _step2.value;
          if (element.innerHTML === dragged.innerHTML) draggedPosition = NUMBER;
          NUMBER++;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    });
  });
}

function eventClick() {
  var linkElements = document.querySelectorAll(".list__ul li a");
  linkElements.forEach(function (linkElement) {
    linkElement.addEventListener('click', function (e) {
      //console.log(e.target.parentNode);
      removeNote(e.target.getAttribute('data-pos'));
    });
  });
}

function addNote(inputText) {
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

function removeNote(pos) {
  todos.splice(pos, 1);
  alertMessage(STRING[LANGUAGE].messageTexts[3], "green");
  pos++;
  var todoElement = document.querySelector(".list__ul li:nth-child(" + pos + ")");
  removeAnimation(todoElement);
  setTimeout(function () {
    todoElement.remove();
  }, 10);
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

function getLanguage() {
  return navigator.language || navigator.userLanguage;
}

function alertMessage(message, color) {
  var alertDiv = document.createElement("div");
  alertDiv.setAttribute('class', 'show');
  alertDiv.style.backgroundColor = color;
  var alertTxt = document.createTextNode(message);
  alertDiv.appendChild(alertTxt);
  appElement.appendChild(alertDiv);
}

function removeMenssage() {
  var alertDiv = document.querySelector(".show");
  if (alertDiv) appElement.removeChild(alertDiv);
}

function removeAnimation(element) {
  //console.log(element);
  element.classList.remove('adding');
  element.classList.add('remove');
}

function toggleLanguage() {
  localStorage.setItem('language', LANGUAGE);
  location.reload();
}