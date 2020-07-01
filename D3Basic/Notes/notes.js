// Remove functionality
d3.select(".removeAll")
    .on("click", function(){
        d3.selectAll(".note")
            .remove();
    })

// Input text
var input = d3.select('input');

// Preview
var preview = d3.select(".preview")

// Add new note
d3.select("#new-note")
    .on("submit", function(){
        d3.event.preventDefault();
        d3.select("#notes")
            .append('p')
            .classed('alert alert-primary note', true)
            .text(input.property('value'));
        input.property('value', '');
        setPreview('');
    })

// Show the preview when typing
input.on("input", function(){
    var note = d3.event.target.value;
    setPreview(note);
})

function setPreview(val){
    preview.text(val)
        .classed("d-none", val === "");
}