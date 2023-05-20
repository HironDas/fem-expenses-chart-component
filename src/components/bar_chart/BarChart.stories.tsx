import type { Meta, StoryObj } from "storybook-solidjs";
import BarChart from "./BarChart";

const meta: Meta<typeof BarChart> = {
    title: "Charts/Bar Chart",
    tags:['autodocs'],
    component: BarChart
}

type Story = StoryObj<typeof BarChart>;

export const Default: Story = {}

export default meta;