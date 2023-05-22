import { JSX } from "solid-js/jsx-runtime";
import './card.scss';

export type CardProps = { foccased?: boolean, children: JSX.Element };

export default function Card(props: CardProps) {
    return (
        <div class="card" classList={{ "card--focus": props.foccased }}>{props.children}</div>
    )
}