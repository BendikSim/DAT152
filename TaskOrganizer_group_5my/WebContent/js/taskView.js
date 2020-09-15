"use strict";

/**
 * Creating GuiHandler and TaskBox objects.
 */
//const ajax = new AjaxHandler();
const container = document.getElementById("tasks");
const gui = new GuiHandler(container);
const tasksmodaleboxdiv = document.getElementById("taskbox");


const statuses = ["WAITING", "ACTIVE", "DONE"]
const tasks = [
    { "id": 1, "title": "Paint roof", "status": "WAITING" },
    { "id": 2, "title": "Clean floor", "status": "DONE" },
    { "id": 3, "title": "Wash windows", "status": "ACTIVE" }
]
const taskbox = new TaskBox(tasksmodaleboxdiv);

gui.allstatuses = statuses;
taskbox.allstatuses = statuses;

const enableButton = document.getElementById("newTask");
enableButton.disabled = false;

const tasknewbutton = document.getElementById("newTask");
tasknewbutton.addEventListener("click",() => {taskbox.show()}, true)



gui.deleteTaskCallback = (id) => {
    console.log(`User has approved the deletion of task with id ${id}.`)
    gui.removeTask(id)
}



gui.newStatusCallback = (id,newStatus) => {
    console.log(`User has approved to change the status of task with id ${id} to ${newStatus}.`)
    gui.updateTask({"id":id,"status":newStatus})
}

taskbox.onSubmit = (task) => {
    console.log(`New task '${task.title}' with initial status ${task.status} is added by the user.`)
    gui.showTask(task);
    taskbox.close();
}


//gui.allstatuses = statuses;


/*Creates a new table (table is currently created in gui constructor)*/
//gui.createTable();

/*Adds all tasks to the table */
tasks.forEach((task) => {gui.showTask(task)});

/** Code for ModalBox
 *
 */



//const tasksmodaleboxdiv = document.getElementById("taskbox");
//const tasknewbutton = document.getElementById("newTask");


//document.getElementById('newTask').getElementsByTagName("button")[0].disable=false

/**Test to see if showTask(id) stop task with existing id from being added. */
//const task4 = {"id": 1, "title": "Jump Rope", "status": "DONE"};
//gui.showTask(task4);

/**Tests that functionality to remove task works. */
//gui.removeTask(3);
//gui.deleteTaskCallback = (id) => {console.log(`User has approved the deletion of task with id ${id}.`)}
//gui.deleteTaskCallback = (id) => {console.log(`Observer, task with id ${id} is not removed from the view!`)}

/**The code below shall update task with id equal 1 and set its status to ACTIVE.*/
//gui.updateTask({"id":1,"status":"ACTIVE"}



/**
 * Starts the setup when you load the page.
 */

//window.addEventListener("load", setup);


