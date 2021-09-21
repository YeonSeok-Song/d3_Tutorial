const width = 500
const height = 500
const margin = ({top: 20, right: 30, bottom: 30, left: 40})

const viewSize = 30

const parseDate = d3.utcParse("%Y-%m-%d")
const formatValue = d3.format(".2f")
const formatDate = d3.utcFormat("%B %-d, %Y")

const formatChange = (y0, y1) => {
    const f = d3.format("+.2%");
    return f((y1 - y0) / y0);
}

const candle_data = d3.csv("./aapl-2.csv", (d) => {
    const date = parseDate(d["Date"]);
    return {
        date,
        high: +d["High"],
        low: +d["Low"],
        open: +d["Open"],
        close: +d["Close"]
    }

}).then((pre_Data) => {

    let view_x = 0

    console.log(view_x)

    let x = d3.scaleBand()
        .domain(d3.utcDay
            .range(pre_Data[view_x].date, +pre_Data[view_x + viewSize - 1].date+1)
            .filter(d => d.getUTCDay() !== 0 && d.getUTCDay() !== 6))
        .range([margin.left, width - margin.right])
        .padding(0.2)

    let y = d3.scaleLog()
        .domain([d3.min(pre_Data, d => Math.floor(d.low)), d3.max(pre_Data, d => Math.ceil(d.high))])
        .rangeRound([height - margin.bottom, margin.top])

    function shift_slow(e) {
        console.log(e)
        console.log(x.bandwidth())
        console.log(e.x - e.subject.x)
        console.log((e.x - e.subject.x) / x.bandwidth())
        // view_x = view_x + (x(-dx) - x(0));
        // console.log(view_x)
        // if (view_x > N-1) view_x = N-1;
        // if (view_x < view_N) view_x = view_N;
        // var view = data.slice(view_x-view_N, view_x);
        // x.domain([view_x-view_N, view_x]);
        // x_axis_el.call(x_axis);
        // update(view);
    }

    function dragmove(e) {
        console.log(e)
        if (!e) return;
        else shift_slow(e);
    }

    const drag = d3.drag()
        .on("drag", dragmove)

    const svg = d3.select("body").append("svg")
        .attr("viewBox", [0, 0, width, height])

    const update = (data) => {

        console.log(data)

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x)
                .tickValues(d3.utcMonday
                    .every(width > 720 ? 1 : 2)
                    .range(data[0].date, data[data.length-1].date))
                .tickFormat(d3.utcFormat("%-m/%-d")))
            .call(g => g.select(".domain").remove())

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y)
                .tickFormat(d3.format("$~f"))
                .tickValues(d3.scaleLinear().domain(y.domain()).ticks()))
            .call(g => g.selectAll(".tick line").clone()
                .attr("stroke-opacity", 0.2)
                .attr("x2", width - margin.left - margin.right))
            .call(g => g.select(".domain").remove())

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        const g = svg.append("g")
                .attr("stroke-linecap", "round")
                .attr("stroke", "black")
            .selectAll("g")
            .data(data)
            .join("g")
                .attr("transform", d => `translate(${x(d.date)},0)`)
        
        const nodes = g.append("g")
            .classed('nodes', true)
    
        nodes.append("line") //데이터 선
        .attr("y1", d => y(d.low))
        .attr("y2", d => y(d.high));

        nodes.append("line") //데이터 막대바
            .attr("y1", d => y(d.open))
            .attr("y2", d => y(d.close))
            .attr("stroke-width", x.bandwidth())
            .attr("stroke", d => d.open > d.close ? d3.schemeSet1[1] //color
                : d.close > d.open ? d3.schemeSet1[0]
                : d3.schemeSet1[8]);
    
        g.append("title")
            .text(d => `${formatDate(d.date)}
            Open: ${formatValue(d.open)}
            Close: ${formatValue(d.close)} (${formatChange(d.open, d.close)})
            Low: ${formatValue(d.low)}
            High: ${formatValue(d.high)}`);
                    
    }
    update(pre_Data.slice(view_x, view_x + viewSize))
    
})
