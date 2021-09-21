const canvas = d3.select("body").append("svg")
                .attr("width", 500)
                .attr("height", 500)

const data = [
    {x : 90, y : 20},
    {x : 40, y : 60},
    {x : 300, y : 300},
]

const group = canvas.append("g")
                .attr("transform", "translate(100, 100)")
//line말고도 circle polyline 등 다양함
const line = d3.line()
            .x((d) => {
                return d.x
            })
            .y((d) => {
                return d.y
            })

group.selectAll("path")
    .data([data])
    .enter()
    .append("path")
    .attr("d", line)
    .attr("fill", "red")
    // .attr("stroke", "#000")
    // .attr("stroke-width", 10)