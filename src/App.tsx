import { Accessor, Component, createEffect, createSignal } from 'solid-js';
import './styles/_index.scss';
import Card from './components/card/Card';
import { data as jsonData } from './data';
import BarChart, { DataType } from './components/bar_chart/BarChart';

const App: Component = () => {
  const [data, setData] = createSignal<DataType[]>([]);
  let [total, setTotal] = createSignal(0);

  createEffect(() => {
    setData(jsonData);
    setTotal(data().reduce((a, b) => a + b.amount, 0));
  })

  return (
    <>

      <div class="container">
        <div class='wrapper'>
          <Card focused >
            <h2 class="card__subtitle card__subtitle--focus">My balance</h2>
            <h1 class="card__title card__title--focus">$921.48</h1>
          </Card>
        </div>
        <div class='wrapper'>
          <Card>
            <h1 class="card__title">Spending - Last 7 days</h1>
            <div class="card__chart">
              <BarChart />
            </div>
            <div class="card__footer">
              <div>
                <h2 class="card__subtitle">Total this month</h2>
                <h1 class="card__title card__title--big">${total()}</h1>
              </div>

              <div >
                <p class="card__bold-text">
                  +2.4%
                </p>
                <h2 class="card__subtitle">from last month</h2>
              </div>
            </div>
          </Card>
        </div>

      </div>
      <div class="attribution">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
        >Frontend Mentor</a
        >. Coded by <a href="mailto:hcdas.09@gmail.com">Hiron Das</a>.
      </div>
    </>
  );
};

export default App;
