"use strict";

/**
 * Class representing the TaskBox
 */
class TaskBox{

    constructor() {
        this.init();
        this._onSubmitCallback = [];
        this._allstatuses = []
    }

    /**
     * allstatuses set and get method
     */
    set allstatuses(s) {
        this._allstatuses = s;
    }

    get allstatuses() {
        return this._allstatuses;
    }

    /**
     * onSubmitCallback set method
     */
    set onSubmit(t){
        this._onSubmitCallback = t;
    }

    init(){
        let addTaskButtonElement = document.getElementById("addTaskButton");
        let spanElement = document.getElementsByClassName("close")[0];

        spanElement.addEventListener("click", () => this.close(), true);
        addTaskButtonElement.addEventListener("click", () => this.submit(), true);

    }

    /**
     * method for opening the modal box
     */
    show(){
        let selectElement = document.getElementById("modalStatuses");

        if (!selectElement.hasChildNodes()) {
            for (let i = 0; i < this._allstatuses.length; i++) {
                let el = document.createElement("option");
                el.innerText = this._allstatuses[i];
                selectElement.appendChild(el);
            }
        }

        let modalElement = document.getElementById("taskbox");
        modalElement.style.display = "block";
    }


    /**
     * Adds a callback to run when the Add task button is clicked.
     */
    submit (){
        let title = document.getElementById("taskInput").value;
        let select = document.getElementById("modalStatuses");
        let status = select.options[select.selectedIndex].textContent;

        if(title !== ""){
            let task = new Task(title, status);
            this._onSubmitCallback(task);
        }else{
            alert("Input title, try agian!");
        }
    }

    /**
    * Method for closing the task box
    */
    close() {
        let tb = document.getElementById("taskbox");
        tb.style.display = "none";
    }

}




/**
 * Class representing a Task
 */
class Task {
    /**
     *Creates a new Task object.
     * @param {String} title
     * @param {String} status
     *
     */
    constructor(title, status) {
        this.title = title;
        this.status = status;
    }


}