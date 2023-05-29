import * as d3 from "d3";
import { createEffect, createSignal, on, onCleanup, onMount } from "solid-js";
import "./bar-chart.scss";
import { data } from "../../data";

export type BarProps = { id: string, width: number, height: number };
export type DataType = { amount: number, day: string };

export default function BarChart() {
    let chartRef: HTMLDivElement;
    const [size, setSize] = createSignal({ width: 0, height: 0 });

    createEffect(on(size, (size) => {
        console.log(size);
        const timer = setTimeout(() => bar({ id: "#bar-chart", ...size }), 0);

        onCleanup(() => clearTimeout(timer));
    }), { defer: true });

    const handler = () => {
        // console.count("I am here");
        // console.log(chartRef);
        setSize({ width: chartRef.clientWidth, height: chartRef.clientHeight })
    }

    onMount(() => {
        window.addEventListener('resize', handler);
        handler();
        //document.getElementById("bar-chart").addEventListener('resize', handler);
    })

    onCleanup(() => {
        // document.getElementById("bar-chart").removeEventListener("resize", handler);
        window.removeEventListener('resize', handler);
    })

    return <div ref={chartRef} class="chart" id="bar-chart"></div>
}

function bar(props: BarProps) {
    d3.selectAll(props.id + " svg").remove();
    // console.log(props);
    if (props.height == 0 || props.width == 0) return;

    const margin = { top: 25, right: 5, bottom: 25, left: 5 };
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    const day = ["sun", "mon", 'tue', 'wed', 'thu', 'fri', 'sat'];
    const barRadius = 5;

    //d3.json("data.json").then((d: any) => console.log(d))
    //let data = fs.readFileSync("../../data.json");
    //let data = cjson.load("../../data.json");
    const svg = d3.select(props.id)
        .append('svg:svg')
        .attr("height", props.height)
        .attr("width", props.width)
        .append('svg:g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleBand()
        .domain(data.map(d => d.day))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d.amount))])
        .range([height, 0]);

    svg.append('g')
        .attr("transform", `translate( 0, ${height})`)
        .call(d3.axisBottom(x)
            .tickSize(0)
            .tickPadding(10 + barRadius)
        )
        .call(g => g.selectAll(".domain").remove())
        .call(g => g.selectAll("line").remove())
        .call(g => g.selectAll('text').attr("dx", "-0.45em").attr('class', 'chart__tick-text'));

    //svg.append('g').call(d3.axisLeft(y));

    const tooltip = d3.select(props.id).append("div")
        .attr("class", "chart__tooltip")
        .attr("role", "tooltip")
        .attr("title", "Amount")
        .style('opacity', 0);

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('path')
        //.transition()
        //.duration(1000)
        // .attr("x", (d) => x(d.day))
        // .attr("y", (d) => y(d.amount))
        // .attr('width', x.bandwidth())
        // .attr('height', (d) => height - y(d.amount))
        .attr("d", item => barChartPath(item, height, x, y, barRadius, barRadius))
        .attr("class", (d) => d.day.toLowerCase() == day[new Date().getDay()] ? 'chart__bar--today' : 'chart__bar--other-day')
        .on('mouseover', (event, d) => {
            tooltip
                .transition()
                .duration(300)
                .style('opacity', 1)
                .style("left", x(d.day) + x.bandwidth() / 2 - 26 + "px")
                .style("top", y(d.amount) - 10 + "px")
                .text("$" + d.amount.toFixed(2));
        }).on('mouseout', (e, d) => {
            tooltip
                .transition()
                .duration(500)
                .style('opacity', 0);
        });

    return svg.node();
}

function barChartPath(item: DataType, height: number, x: d3.ScaleBand<string>, y: d3.ScaleLinear<number, number, never>, rx: number, ry: number) {
    return `
        M${x(item.day)},${y(item.amount) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${x.bandwidth() - 4 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - y(item.amount) - ry}
        a${rx},${ry} 0 0 1 ${-rx},${ry}
        h${4 * rx - x.bandwidth()}
        a${rx},${ry} 0 0 1 ${-rx},${-ry}Z
      `;
}