import * as d3 from "d3";
import { createEffect, createSignal, on, onCleanup, onMount } from "solid-js";
import "./bar-chart.scss";

export type BarProps = { id: string, width: number, height: number }

export default function BarChart() {
    let chartRef: HTMLDivElement;
    const [size, setSize] = createSignal({ width: 0, height: 0 });

    createEffect(on(size, (size) => {
        const timer = setTimeout(() => bar({ id: "#bar-chart", ...size }), 0);

        //onCleanup(() => clearTimeout(timer));
    }), { defer: true });

    const handler = () => {
        console.count("I am here");
        setSize({ width: chartRef.clientWidth, height: chartRef.clientHeight })
    }

    onMount(() => {
        handler();
        //document.getElementById("bar-chart").addEventListener('resize', handler);
        window.addEventListener('resize', handler);
    })

    onCleanup(() => {
        // document.getElementById("bar-chart").removeEventListener("resize", handler);
        window.removeEventListener('resize', handler);
    })

    return <div ref={chartRef} class="chart" id="bar-chart"></div>
}

function bar(props: BarProps) {
    d3.select(props.id).empty();
    // console.log(props);

    const margin = { top: 5, right: 5, bottom: 5, left: 5 };
}