//DOM elements < data elements (enter)
//DOM elements > data elements (exit)
//DOM elements = data elements (update)

let data = [10]; //여기에 들어있는 것들은 update에 속한 값

const canvas = d3.select("body")
                .append("svg")
                .attr("width", 500)
                .attr("height", 500)

const circle1 = canvas.append("circle")
                .attr("cx", 50)
                .attr("cy", 100)
                .attr("r", 25)

const circle2 = canvas.append("circle")
                .attr("cx", 50)
                .attr("cy", 200)
                .attr("r", 25)

//미리 만들어진 circle을 먼저 찾아서 그 개수대로 데이터와 매핑해 update로 보냄
//만약 selectAll해서 찾은 circle element의 개수보다 데이터의 개수가
// 많으면 그 데이터는 enter로 감.
const circles = canvas.selectAll("circle")
                .data(data) 
                .attr("fill", "red") //update selection
                // .enter()
                //     .append("circle")
                //     .attr("cx", 50)
                //     .attr("cy", 50)
                //     .attr("fill", "green")
                //     .attr("r", 25)
                .exit()
                    .attr("fill", "blue")


//위의 예시로 만약 circle2의 주석이 없어지면 2개의 element가 존재하므로
//둘다 update에 소속
//하지만 circle이 하나라면 두번째 20에 해당되는 circle은 enter에 소속

//exit은 미리 존재하는 circle의 개수가 데이터 개수보다 많을때
//할당되지 않은 circle을 가리키기 위한 함수
//여기서는 10에 circle1이 할당되었지만 circle2는 할당되지 않았기 때문에
//exit()을 하게 되면 circle2를 가리킴.