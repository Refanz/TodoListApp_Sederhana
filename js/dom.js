const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
const TODO_ITEMID = "itemId";

const makeTodo = (data, timeStamp, isCompleted) => {
    const textTitle = document.createElement("h2");
    textTitle.innerText = data;

    const textTimeStamp = document.createElement("p");
    textTimeStamp.innerText = timeStamp;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle, textTimeStamp);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);

    if(isCompleted){
        container.append(
            createUndoButton(),
            createTrashButton());
    }else{
        container.append(createCheckButton());
    }
    
    return container;

}

const createUndoButton = () => {
    return createButton("undo-button", (event) => {
        undoTaskFromCompleted(event.target.parentElement);
    });
}

const createTrashButton = () => {
    return createButton("trash-button", (event) => {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

const createCheckButton = () => {
    return createButton("check-button", (event) => {
        addTaskToCompleted(event.target.parentElement);
    });
}

const createButton = (buttonTypeClass, eventListener) => {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", (event) => {
        eventListener(event);
    });

    return button;
}

const addTodo = () => {
    const uncompletedListTODOId = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const textTodo = document.getElementById("title").value;
    const timeStamp = document.getElementById("date").value;

    const todo = makeTodo(textTodo, timeStamp, false);
    
    const todoObject = composeTodoObject(textTodo, timeStamp, false);
    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);
   
    uncompletedListTODOId.append(todo);

    updateDataToStorage();
}

const addTaskToCompleted = (taskElement) => {
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimeStamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskTimeStamp, true);
    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = true;
    newTodo[TODO_ITEMID] = todo.id;
    
    listCompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

const removeTaskFromCompleted = (taskElement) => {

    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    todos.splice(todoPosition, 1);

    taskElement.remove();

    updateDataToStorage();
}

const undoTaskFromCompleted = (taskElement) => {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimeStamp = taskElement.querySelector(".inner > p").innerText;
    const newTodo = makeTodo(taskTitle, taskTimeStamp, false);
    
    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = false;
    newTodo[TODO_ITEMID] = todo.id;

    listUncompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();

}