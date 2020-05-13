// Check off specific todos by clicking
$("ul").on("click", "li", function(){
    $(this).toggleClass("check");
});

// Click on X to delete todo
$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    // Stop propagation on the events to parents objects
    event.stopPropagation();
})

// Add new todo
$("input[type='text']").keypress(function(event){
    if(event.which === 13 & $(this).val() != ""){
        // Grabbing new todo text from input
        var todoText = $(this).val();
        // Clear input
        $(this).val("");
        // Create a new li and add to ul
        $("ul").append('<li><span><i class="fas fa-trash-alt"></i></span> '+ todoText +"</li>");
    }
});

// Taggle input
$(".fa-plus").on("click", function(){
    $("input[type='text']").fadeToggle();
});