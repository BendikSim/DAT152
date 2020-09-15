"use strict";
/**
 *
 */
class GuiHandler {
    constructor(container) {
        this.allstatuses = [];
        this.container = container;
        this.deleteTaskCallbackArray = [];
        this.newStatusCallbackArray = [];
        //this.createTable();
    }


    /**
     * Adds a new task to the view.
     *
     * @param {object} taskData
     */
    showTask(task) {
        let select = document.createElement("select");
        let option = document.createElement("option");

        select.setAttribute("class", "selectelement");
        option.setAttribute("value", "0");
        option.setAttribute("selected", "");
        option.innerText = "<MODIFY>";
        select.appendChild(option);

        for (const status of this.allstatuses) {
            let opt = document.createElement("option");
            opt.setAttribute("value", status);
            let disb = ``;
            if (task.status === status) {
                opt.setAttribute("disabled", "");
            }
            opt.innerText = status;
            select.appendChild(opt);
        }


        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");

        let tbody = document.getElementById("tbody");
        let tableButton = document.createElement("button");
        let removeButton = document.getElementsByClassName('removebtn');
        let selectors = document.getElementsByClassName('selectelement');

        tr.setAttribute("id", task.id);

        td1.textContent = task.title;
        td2.textContent = task.status;
        td3.appendChild(select);

        tableButton.setAttribute("class", "removebtn");
        tableButton.setAttribute("type", "button");
        tableButton.setAttribute("id", "rbtn");
        tableButton.textContent = "Remove";

        td4.appendChild(tableButton);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        tbody.insertBefore(tr, tbody.childNodes[0]);


        removeButton[0].addEventListener("click", this.removeTaskClick);
        selectors[0].addEventListener("change", this.updateTaskClick)

        this.noTask();
    }

    /**
     * Updates the status of a given task.
     *
     * @param {object} task Task to be updated
     */
    updateTask = (task) => {
        const node = document.getElementById(task.id);
        if(task.title != null){
            node.getElementsByTagName('td')[0].innerText = task.title;
        }
        console.log('ID er: ' + task.id);

        const select = document.getElementById(task.id).getElementsByTagName('select')[0];
        const status = select.options[select.selectedIndex].value;
        if (status != 0){
            node.getElementsByTagName('td')[1].innerText = status;
        }
        node.getElementsByTagName('select')[0].selectedIndex = 0;
        console.log(task.status);
        this.noTask();
    }

    updateTaskClick = (t) => {
        let selector = t.currentTarget;
        let selectedValue = t.currentTarget.value;
        let taskName = selector.parentElement.parentElement.getElementsByTagName("td")[0].textContent;

        let confirm = window.confirm("Set " + taskName + " to " + selectedValue + "?");

        if (confirm) {
            console.log(this.newStatusCallbackArray);
            this.newStatusCallbackArray.forEach((x) => x(selector.parentElement.parentElement.id, selectedValue));
        } else {
            console.log("You just cancelled to update a task status!");
        }
    }

    /**
     * Removes a task from view
     *
     * @param {number} id Id of task to be removed
     */
    removeTask = (id) => {
        let task = document.getElementById(id);

        if (task != null) {
            task.parentElement.removeChild(task);
        }
        this.noTask();
    }
    removeTaskClick = (t) => {
        let button = t.currentTarget;
        let tableRow = button.parentElement.parentElement;
        let taskName = tableRow.getElementsByTagName("td")[0].textContent;

        let confirm = window.confirm("Delete task" + taskName + "?");

        if(confirm){
            this.deleteTaskCallbackArray.forEach((t) => t(tableRow.id));
        }else{
            console.log("Cancelled to delete task.")
        }
    }

    /**
     * Checks if there are any tasks in the view by checking if tbody has any rows.
     */
    noTask(){
        let table = document.getElementById("tbody");
        let count = table.rows.length;

        if(count !== 1 && count !==0){
            document.getElementById("message").innerText = "Found " + count + " tasks."
        }else if (count === 1){
            document.getElementById("message").innerText = "Found " + count + " task."
        }else{
            document.getElementById("message").innerText = "Waiting for server data.";
        }
    }


    /**
     * Creates a new table from scratch by using DOM-methods. Appends it to the last child of the this.container.
     */
    /**
    createTable() {
        const tasklist = this.container.lastElementChild;
        const table = document.createElement("table");
        const thead = table.createTHead();
        const tbody = document.createElement("tbody");
        const headerRow = document.createElement("tr");
        const taskHeader = document.createElement("th");
        const statusHeader = document.createElement("th");

        const taskTextNode = document.createTextNode("Tasks");
        const statusTextNode = document.createTextNode("Status");

        taskHeader.appendChild(taskTextNode);
        statusHeader.appendChild(statusTextNode);

        headerRow.appendChild(taskHeader);
        headerRow.appendChild(statusHeader);

        thead.appendChild(headerRow);

        table.appendChild(thead);
        table.appendChild(tbody);

        tasklist.appendChild(table);
    }
     */


    /**
     * To set a list of all possible task state, i.e. the values that can be
     * chosen with the HTML select elements.
     */
    set allstatuses(allstatuses){
        this._allstatuses = allstatuses;
    }

    /**
     * to set a list of all possible task state, i.e. the values that can be
     * chosen with the HTML select elements.
     */
    get allstatuses(){
        return this._allstatuses;
    }

    /**
     * Delete task callback setter
     */
    set deleteTaskCallback(f) {
        this.deleteTaskCallbackArray.push(f);
    }

    /**
     * New status callback setter
     */
    set newStatusCallback(f) {
        this.newStatusCallbackArray.push(f);
    }

}
