// write your code here!

var width = 800;
var height = 400;
var barPadding = 10;
var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

d3.select("#reset")
    .on("click", function(){
        d3.selectAll(".letter")
            .remove();
        
        d3.select("#phrase")
            .text("");
        
        d3.select("#count")
            .text("");
    })

d3.select("form")
    .on("submit", function(){
        d3.event.preventDefault();
        var input = d3.select("input");
        var text = input.property("value");
        var data = getFreq(text);
        var barWidth = width / data.length - barPadding;
        var letters = svg
                        .selectAll(".letter")
                        .data(data, function(d){
                            return d.char;
                        })
        
        letters
            .classed("new", false)
            .exit()
            .remove();

        var letterEnter = letters
            .enter()
            .append("g")
                .classed("letter", true)
                .classed("new", true)
        
        letterEnter.append("rect");
        letterEnter.append("text");

        letterEnter.merge(letters)
            .select("rect")
                .attr("width", barWidth)
                .attr("height", function(d){
                    return d.count * 20;
                })
                .attr("x", function(d,i) {
                    return (barWidth + barPadding) * i
                })
                .attr("y", function(d) {
                    return height - d.count * 20;
                })

        letterEnter.merge(letters)
            .select("text")
                .attr("x", function(d,i) {
                    return (barWidth + barPadding) * i + barWidth / 2;
                })
                .attr("text-anchor", "middle")
                .attr("y", function(d){
                    return height - d.count * 20 - 10;
                })
                .text(function(d){
                    return d.char;
                })


        d3.select("#phrase")
                .text("Analysis of:" + text);
        
        d3.select("#count")
                .text("(New characters: " + letters.enter().nodes().length + ")");

        input.property("value", "");
    })

function getFreq(str){
    var sorted = str.split("").sort();
    var data = [];
    for(var i = 0; i < sorted.length; i++){
        var last = data[data.length -1]
        if(last && last.char === sorted[i]) last.count++;
        else data.push({char : sorted[i], count : 1});
    }
    return data;
}

// getFreq("hello")[{char: "h", count : 1}, ..., {char: "o", count : 1}]