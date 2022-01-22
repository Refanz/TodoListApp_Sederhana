const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";

const addTodo = () => {

    const uncompletedListTODOId = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const textTodo = document.getElementById("title").value;
    const timeStamp = document.getElementById("date").value;
    console.log("todo " + textTodo);
    console.log("timestamp " + timeStamp);

    for(let i = 0; i < 10; i++){
        const todo = makeTodo(textTodo, timeStamp);
        uncompletedListTODOId.append(todo);
    }
}

const makeTodo = (data, timeStamp) => {
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

    container.append(createCheckButton());
    return container;

}

const createButton = (buttonTypeClass, eventListener) => {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", (event) => {
        eventListener(event);
    });
    return button;
}

const addTaskToCompleted = (taskElement) => {
    taskElement.remove();
}

const createCheckButton = () => {
    return createButton("check-button", (event) => {
        addTaskToCompleted(event.target.parentElement);
    });
}