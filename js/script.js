document.addEventListener("DOMContentLoaded", function() {

    const submitForm = document.getElementById("form");

    submitForm.addEventListener("submit", function(){
        
        addTodo();
        event.preventDefault();
    });

    if(isStorageExist()){

        loadDataFromStorage();
        
    }

});

document.addEventListener("ondatasaved", () => {

    console.log("Data Berhasil Disimpan");

});

document.addEventListener("ondataloaded", () => {

    refreshDataFromTodos();
    
});