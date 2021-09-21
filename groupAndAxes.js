const dataArray = [20, 30, 40, 60];

const width = 500;
const height = 500;

//도메인의 최소를 0부터 최대 100 
//range의 최소를 0부터 최대는 넓이인 500
//두 배열의 선형 비율을 계산한다.
//입력받은 값이 domain에 포함된 값이면 range에 비례된 값으로 바꿔주는 scale
const heightScale = d3.scaleLinear()
                .domain([0, 100])
                .range([0, width])

//0을 red로 100을 blue로 해서 선형적으로 변하는 색상 scale
const color = d3.scaleLinear()
                .domain([0, 100])
                .range(["red", "blue"])

//axisTop, axisLeft 등등 많이 있음
const axis = d3.axisRight()
                .ticks(5) //간격의 개수 지점은 총 6개
                .scale(heightScale); //화면에 표시되는 스케일을 넣어줘야 됨.

const canvas = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(20, 0)")
                

const bars = canvas.selectAll("rect")
                .data(dataArray)
                .enter()
                    .append("rect")
                    .attr("width", 50)
                    .attr("height", function(d) {
                        return heightScale(d);
                    })
                    .attr("x", function(d, i) { 
                        console.log(i)
                        return i * 70 
                    })
                    .attr("fill", function(d) {
                        return color(d);
                    })

//canvas에서 체이닝으로 직접 해도 되고 이렇게 나눠서 정의해줘도 됨.
//마지막에 call을 통해 axis를 꼭 불러줘야 출력됨.
canvas.append("g")
    .attr("transform", "translate(400, 0)")
    .call(axis)