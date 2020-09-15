"use strict";

/**
 * Creating AjaxHandler, GuiHandler and TaskBox objects.
 */
const ajax = new AjaxHandler();

const container = document.getElementById("tasks");
const gui = new GuiHandler(container);

const tasksmodaleboxdiv = document.getElementById("taskbox");
const taskbox = new TaskBox(tasksmodaleboxdiv);

const tasknewbutton = document.getElementById("newTask");
tasknewbutton.addEventListener("click", () => {taskbox.show()}, true)

async function init() {
    const statusesJson = await ajax.getAllStatuses();
    const statuses = statusesJson.allstatuses;
    const tasksJson = await ajax.getTasklist();
    const tasks = tasksJson.tasks;

    gui.allstatuses = statuses;
    taskbox.allstatuses = statuses;
    
    /*Adds all tasks to the view */
    tasks.forEach((task) => {
        gui.showTask(task);
    });

    /*Enables the newTaskButton*/
    const enableButton = document.getElementById("newTask");
    enableButton.disabled = false;

    taskbox.onSubmit = (task) => {
        console.log(
            `New task '${task.title}' with initial status ${task.status} is added by the user.`
        );
        ajax.newTask(task, gui.showTask.bind(gui));
        taskbox.close();
    };

    gui.newStatusCallback = (id, newStatus) => {
        console.log(
            `User has approved to change the status of task with id ${id} to ${newStatus}.`
        );
        ajax.modifyTask(id, newStatus, gui.updateTask.bind(gui));
    };

    gui.deleteTaskCallback = (id) => {
        console.log(`User has approved the deletion of task with id ${id}.`);
        ajax.deleteTask(id, gui.removeTask.bind(gui));
    };

    gui.noTask()
        ? (tasknewbutton.disabled = true)
        : (tasknewbutton.disabled = false);

}

init();
