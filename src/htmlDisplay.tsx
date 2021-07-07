import { Product, Order } from "./data/entities";
import { createElement } from './tools/jsxFactory';

export class HtmlDisplay {

  props: {
    products: Product[],
    order: Order,
  };

  getContent(): HTMLElement {
    // returning jsx element
    return <h3 className="bg-secondary text-center text-white p-2"> {this.getElementText()} </h3>
  };

  getElementText(): string {
    return `Liczpa produktów: ${this.props.products.length}
    Wartość całkowita zamówienia: ${this.props.order.total}`;
  };
};