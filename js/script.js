document.addEventListener("DOMContentLoaded", function() {

    const submitForm = document.getElementById("form");
    submitForm.addEventListener("submit", function(){
        
        addTodo();
        event.preventDefault();
    });

});