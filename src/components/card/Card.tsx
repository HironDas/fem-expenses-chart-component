import { JSX } from "solid-js/jsx-runtime";
import './card.scss';

export type CardProps = { focused?: boolean, children: JSX.Element };

export default function Card(props: CardProps) {
    return (
        <div class="card" classList={{ "card--focus": props.focused }}>{props.children}</div>
    )
}