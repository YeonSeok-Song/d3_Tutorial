const canvas = d3.select("body")
                .attr("width", 500)
                .attr("height", 500)

d3.json("data1.json", function(data) { //확장자만 바꾸면 csv도 가능
    
    canvas.selectAll("rect")
        .data(data)
        .enter()
            .append("rect")
            .attr("width", function (d) {
                return d.age * 10
            })
            .attr("height", 40)
            .attr("y", function (d, i) {
                return i * 50
            })
            attr("fill", "blue")

    canvas.selectAll("text")
        .data(data)
        .enter()
            .append("text")
            .attr("y", function (d, i) {
                return i * 50 + 24
            })
            .attr("fill", "white")
            .text((d) => {
                return d.name
            })
})