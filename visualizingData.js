const dataArray = [20, 30, 40, 45];

const canvas = d3.select("body")
                .append("svg")
                .attr("width", 500)
                .attr("height", 500)
                .attr("fill", "orange");

const bars = canvas.selectAll("rect")
                .data(dataArray)
                .enter()
                    .append("rect")
                    .attr("width", 50)
                    .attr("height", function(d) {
                        //사실 d자리에 어떤게 들어가든 상관 없다.
                        return d * 10
                    })
                    .attr("x", function(d, i) { 
                        console.log(i) //i는 인덱스
                        return i * 70 
                    })
                    //x는 가로의 위치
                    //y는 세로 위치