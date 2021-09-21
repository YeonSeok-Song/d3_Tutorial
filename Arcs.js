const canvas = d3.select("body").append("svg")
                .attr("width", 1500)
                .attr("height", 1500)

const group = canvas.append("g")
                .attr("transform", "translate(300, 300)")

const data = [10, 50, 80]

const color = d3.scaleLinear()
                    .domain([0, 100])
                    .range(["red", "blue", "orange"]);

const r = 300;
const p = Math.PI * 2;

const arc = d3.arc()
            // .enter()
            // .data(data)
            .innerRadius(r - 100) //안쪽원 반지름
            .outerRadius(r) //바깥쪽 원 반지름

const pie = d3.pie() //pie(data) 콘솔에 해볼것
            .value((d) => {return d})

const arcs = group.selectAll(".arc")
                .data(pie(data))
                .enter()
                .append("g") //g태그로 각각의 값에 대한 그래프를 묶는다.
                .attr("class", "arc")


arcs.append("path") //값에 대한 그래프를 color scale을 이용해 그린다.
    .attr("d", arc)
    .attr("fill", (d) => {
        return color(d.data)
    })

arcs.append("text") //그래프 안에 텍스트를 입력한다.
    .attr("transform", (d) => {
        return "translate(" + arc.centroid(d)+")"
    })
    .attr("text-anchor", "middle")
    .attr("font-size", "1.5em")
    .text((d) => {return d.data})
