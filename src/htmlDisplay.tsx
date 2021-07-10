import { Product, Order } from "./data/entities";
import { createElement } from './tools/jsxFactory';
import { AbstractDataSource } from "./data/abstractDataSource";
import { ProductList } from "./productList";
import { Header } from "./header";
import { Summary } from "./summary";
import { OrderDetails } from "./orderDetails";

enum DisplayMode {
  List, Details, Complete
}

export class HtmlDisplay {
  private containerElem: HTMLElement;
  private selectedCategory: string;
  private mode: DisplayMode = DisplayMode.List;
  private orderId: number;

  constructor() {
    this.containerElem = document.createElement("div");
  };

  props: {
    dataSource: AbstractDataSource;
  };

  async getContent(): Promise<HTMLElement> {
    await this.updateContent();
    return this.containerElem;
  };

  async updateContent() {
    let products = await this.props.dataSource.getProducts("id", this.selectedCategory);
    let categories = await this.props.dataSource.getCategories();

    this.containerElem.innerHTML = "";

    let contentElement: HTMLElement;

    switch (this.mode) {
      case DisplayMode.List:
        contentElement = this.getListContent(products, categories);
        break;

      case DisplayMode.Details:
        contentElement = <OrderDetails order={this.props.dataSource.order} cancelCallback={this.showList} submitCallback={this.submitOrder} />
        break;

      case DisplayMode.Complete:
        contentElement = <Summary orderId={this.orderId} callback={this.showList} />
        break;
    
      default:
        break;
    }

    // let content = (
    //   <div>
    //     <ProductList 
    //       products={products}
    //       categories={categories}
    //       selectedCategory={this.selectedCategory}
    //       addToOrderCallback={this.addToOrder}
    //       filterCallback={this.selectCategory}
    //     />
    //   </div>
    // );

    this.containerElem.appendChild(contentElement);
  };

  getListContent(products: Product[], categories: string[]): HTMLElement {
    return (
      <div>
        <Header order={this.props.dataSource.order} submitCallback={this.showDetails} />

        <ProductList 
          products={products}
          categories={categories}
          selectedCategory={this.selectedCategory}
          addToOrderCallback={this.addToOrder}
          filterCallback={this.selectCategory}
        />
      </div>
    )
  }

  addToOrder = (product: Product, quantity: number) => {
    this.props.dataSource.order.addProduct(product, quantity);
    this.updateContent();
  };

  selectCategory = (selected: string) => {
    this.selectedCategory = selected === "Wszystkie" ? undefined : selected;
    this.updateContent();
  };

  showDetails= () => {
    this.mode = DisplayMode.Details;
    this.updateContent();
  }

  showList = () => {
    this.mode = DisplayMode.List;
    this.updateContent();
  }

  submitOrder = () => {
    this.props.dataSource.storeOrder().then(id => {
      this.orderId = id;
      this.props.dataSource.order = new Order();
      this.mode = DisplayMode.Complete;
      this.updateContent();
    })
  }
};