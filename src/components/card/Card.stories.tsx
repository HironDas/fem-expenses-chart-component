import type { Meta, StoryObj } from "storybook-solidjs";
import Card from "./Card";

const meta: Meta<typeof Card> = {
    title: "Components/Card",
    tags: ['autodocs'],
    component: Card
}

type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        focused: true,
        children: (<div>
            <h2 class="card__subtitle card__subtitle--focus">My balance</h2>
            <h1 class="card__title card__title--focus">$921.48</h1>
        </div>)
    }
}

export default meta;