const canvas = d3.select("body")
                .append("svg")
                .attr("width", 500)
                .attr("height", 500)
                .attr("fill", "orange");

const circle = canvas.append("circle")
                .attr("cx", 250)
                .attr("cy", 250)
                .attr("r", 50)
                .attr("fill", "red");

const rect = canvas.append("rect")
                .attr("width", 100)
                .attr("height", 50);

const line = canvas.append("line") //x1, y1 => 첫번째 점 x2, y2 => 두번째 점
                .attr("x1", 100)
                .attr("y1", 100)
                .attr("x2", 200)
                .attr("y2", 300)
                .attr("stroke", "green")