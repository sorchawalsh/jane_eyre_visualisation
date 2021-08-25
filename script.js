draw_sentence_graph = function(chapter){
    'use strict';
    let data = d3.csv("data/jane_eyre_split.csv", function(d) {
        return {
            chapter: +d.chapter,
            sentence: +d.sentence,
            words: +d.words,
            polarity: d.sentiment,
            most_pos: d.most_pos,
            most_neg: d.most_neg
        }
    }).then(data=>{
        let filtered_data=data.filter(d=>d.chapter===chapter)
        let chapter_length=filtered_data.length
        let most_positive = filtered_data[chapter_length-1].most_pos
        let str_max_polarity = filtered_data[chapter_length-1].polarity
        str_max_polarity=str_max_polarity.replace("\[","")
        str_max_polarity=str_max_polarity.replace("\]","")
        let max_polarity=str_max_polarity.split(",")
        let most_negative = filtered_data[chapter_length-1].most_neg
        // création du canevas
        var  margin = { top: 10, right: 0, bottom: 25, left: 0 };
        var colorScale = d3.scaleSequential(d3.interpolateBlues)
            .domain([-1,1])
        const canvas = d3.select("div").append("svg")
            .attr("width", 1000 + margin.right + margin.left)
            .attr("height", 100 + margin.top + margin.bottom)
        const x= d3.scaleBand()
        .domain(data.map(function(d){ return d.sentence}))
        .range([0, 1000]);
        const y = d3.scaleLinear()
            .domain([0,d3.max(data, d => d.words)])
            .range([50,0]);
         canvas.selectAll("rect")
      .data(filtered_data)
      .enter()
      .append("rect")
        .attr("y", d => 50-y(d.words))
        .attr("x", d => x(d.sentence))
        .attr("width", x.bandwidth())
        .attr("height", d => y(d.words))
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
         .attr("fill", function(d){
             if(!d.polarity.startsWith("[")){
                 return colorScale(parseFloat(d.polarity,10))
                }
             else{
                 return "white"
             }
             })
canvas.append('title')
  .text(function(d) { return "Most positive: " + most_positive +  "\nValue: " + max_polarity[0]+"\n\n"+
                             "Most negative: " + most_negative + "\nValue: " + max_polarity[1]; })

// ajouter l'axe des Y
canvas.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(d3.axisLeft(y))
canvas.append("g")
      .attr("transform",
            "translate(" + (100/2) + " ," +
                           (100 + margin.top + 20) + ")")
      .text("sentences");

canvas.append("text")
    .style("fill", "rgb(12, 8, 87)")
    .attr("dy", "50px")
    .attr("dx", "1em")
    .attr("text-anchor", "middle")
    .attr("color", "white")
    .text(chapter);
    })



}

// Using async/await to prevent issue where chapters loaded out of order
// First we need a promisified setTimeout:
function delay (ms) {
    return new Promise((resolve,reject) => setTimeout(resolve,ms));
}

async function test () {
    for (let i=0;i<38;i++){
        await delay(100);
        draw_sentence_graph(i)
    }
}

test();