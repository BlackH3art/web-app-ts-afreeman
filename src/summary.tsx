import { createElement } from "./tools/jsxFactory";

export class Summary {

  props: {
    orderId: number,
    callback: () => void
  }

  getContent(): HTMLElement {
    return (
      <div className="m-2 text.center">
        <h2>Dziękujemy!</h2>
        <p>Udało Ci się złożyć zamówienie.</p>
        <p>Numer zamówienia to: {this.props.orderId}</p>
        <p>Nie wyślemy zamówionych produktów bo to pic na wodę fotomontaż.</p>

        <button className="btn btn-primary" onclick={this.props.callback}>
          OK
        </button>
      </div>
    )
  }
}