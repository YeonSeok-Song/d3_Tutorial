const canvas = d3.select("body")
                .append("svg")
                .attr("width", 500)
                .attr("height", 500)

const circle = canvas.append("circle")
                .attr("cx", 50)
                .attr("cy", 50)
                .attr("r", 25)

circle.transition()
    .duration(1500) //1.5초동안 움직임
    // .delay(2000) //움직이기 전 딜레이
    .attr("cx", 150) //목표 거리
    // .transition() //이렇게 끝나고 다음 움직일 애니메이션 지정 가능
    // .attr("cy", 200)
    // .transition()
    // .attr("cx", 50)
    .on("end", function () {
        d3.select(this) //this => 지금 이 circle
            .attr("fill", "red") 
    })