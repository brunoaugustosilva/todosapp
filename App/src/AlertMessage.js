"use strict";

const Colors = require('./Colors');

class AlertMessage{
    
    constructor(){
        
    }

    static show(title, type = "1"){
        let colors = new Colors(type);

        var alertDiv = document.createElement("div");
        alertDiv.setAttribute('class', 'show');
        alertDiv.style.backgroundColor = colors.getColor();
    
        var alertTxt = document.createTextNode(title);

        alertDiv.appendChild(alertTxt);
        appElement.appendChild(alertDiv);
    }
}

export default AlertMessage;