$(document).ready(function(){
    $.getJSON('/api/todos')
        .then(addTodos)

    $('#todoInput').keypress(function(event) {
        if(event.which == 13){
            createTodo();
        }
    });

    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    });

    $('.list').on('click', 'span', function(e) {
        e.stopPropagation(); // Prevent event propagation to parent element
        removeTodo($(this).parent());
    })
});

function addTodo(todo){
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function addTodos(todos){
    todos.forEach((todo) => {
        addTodo(todo);
    })
}

function createTodo(){
    var userInput = $('#todoInput').val();
    $.post('api/todos', {name: userInput})
        .then((newTodo) => {
            addTodo(newTodo);
            $('#todoInput').val('');
        })
        .catch((err) => {
            console.log(err);
        });
}

function removeTodo(todo) {
    var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(() => {
        todo.remove();
    })
    .catch((err) => {
        console.log(err)
    });
}

function updateTodo(todo){
    var clickedId = todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed : isDone};
    var updateUrl = '/api/todos/' + clickedId;

    $.ajax({
        method: 'PUT',
        url : updateUrl,
        data: updateData
    })
    .then((updatedTodo) =>{
        todo.toggleClass("done");
        todo.data('completed', isDone);
    })
    .catch((err) => {
        console.log(err);
    })
}