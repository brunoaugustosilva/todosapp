"use strict";

class Colors {

    /*let COLORS = {
        INFORMATION: "#bba836",
        ALERT: "#bba836",
        ERROR: "#ef6161",
        SUCESSFUL: "#219a55",
    };*/

    //const __INFORMATION = "#FFF";

    constructor(type){
        this.setType(type);
    }

    setType(type){
        if(type >= 1 && type <= 4){
            this.__type = type;
        }
    }

    getColor(){
        if(type == 1){
            return "#bba836";
        }
        else if(type == 2){
            return "#bba836";
        }
        else if(type == 3){
            return "#ef6161";
        }
        else if(type == 4){
            return "#219a55";
        }
        return "";
    }
}

export default Colors;