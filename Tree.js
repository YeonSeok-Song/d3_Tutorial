// const data = {
//     source: {
//       x: 10,
//       y: 10
//     },
//     target: {
//       x: 300,
//       y: 300
//     }
// };

const tree_data = {
  "name": "flare",
  "children": [
   {
    "name": "analytics",
    "children": [
     {
      "name": "cluster",
      "children": [
       {"name": "AgglomerativeCluster", "size": 3938},
       {"name": "CommunityStructure", "size": 3812},
       {"name": "MergeEdge", "size": 743}
      ]
     },
     {
      "name": "graph",
      "children": [
       {"name": "BetweennessCentrality", "size": 3534},
       {"name": "LinkDistance", "size": 5731}
      ]
     }
    ]
   }
  ]
 }

const width = 954

const tree = (data) => {
  const root = d3.hierarchy(data)
  console.log(root)
  root.dx = 10
  root.dy = width / (root.height + 1);
  return d3.tree().nodeSize([root.dx, root.dy])(root)
}    

const root = tree(tree_data)

let x0 = Infinity;
let x1 = -x0;
root.each(d => {
  if (d.x > x1) x1 = d.x;
  if (d.x < x0) x0 = d.x;
});

// const canvas = d3.select("body").append("svg")
//                 .attr("width", 500)
//                 .attr("height", 500)
//                 .append("g")
//                     .attr("transform", "translate(50, 50)");

const svg = d3.select("body").append("svg")
      .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);
//viewbox => x좌표 y좌표, width, height

const g = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

console.log(root.links())
const link = g.append("g") //선
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
    .selectAll("path")
      .data(root.links())
      .join("path")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

console.log(root.descendants())
const node = g.append("g") //원소
            .attr("stroke-linejoin", "round") //테두리 형태(글자이므로 round)
            .attr("stroke-width", 3) //테두리 넓ㅅ이
          .selectAll("g")
          .data(root.descendants())
          .join("g")
            .attr("transform", d => `translate(${d.y},${d.x})`);     
            
node.append("circle")
            .attr("fill", d => d.children ? "#555" : "#999")
            .attr("r", 2.5);
      
node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.children ? -6 : 6)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name)
          .clone(true).lower() //위의 요소를 하나씩 그대로 복사해 새로 추가
          //true면 선택된 요소의 하위 요소까지 복제
          //http://using-d3js.com/01_04_create_delete_move_elements.html
          //글자 자체에 테두리색을 흰색으로 줘서 선을 안보이게 함.
            .attr("stroke", "white"); 


console.log(node)

// console.log(root)
// const link = d3.linkHorizontal()
//                 .x((d) => {
//                     return d.x
//                 })
//                 .y((d) => {
//                     return d.y
//                 })

// canvas.append("path")
//     .attr("fill", "none")
//     .attr("stroke", "black")
//     .attr("d", link(data));

