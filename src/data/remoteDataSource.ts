import { AbstractDataSource } from "./abstractDataSource";
import { Product, Order } from "./entities";
import axios from 'axios';


const protocol = 'http';
const hostname = 'localhost';
const port = 4600;

const urls = {
  products: `${protocol}://${hostname}:${port}/products`,
  orders: `${protocol}://${hostname}:${port}/orders`
};

export class RemoteDataSource extends AbstractDataSource {

  loadProducts(): Promise<Product[]> {
    return axios.get(urls.products).then(response => response.data);
  };

  storeOrder(): Promise<number> {
    let orderData = {
      lines: [...this.order.orderLines.values()].map(orderLine => ({
        productId: orderLine.product.id,
        productName: orderLine.product.name,
        quantity: orderLine.quantity
      }))
    };

    return axios.post(urls.orders, orderData).then(response => response.data.id);
  };
};