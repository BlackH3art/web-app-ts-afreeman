import { AbstractDataSource } from "./abstractDataSource";
import { Product } from "./entities";

export class LocalDataSource extends AbstractDataSource {

  loadProducts(): Promise<Product[]> {
    return Promise.resolve([
      { id: 1, name: "kajak", category: "woda", description: "asdfd jasdgja sdgjaj ga g", price: 123.12},
      { id: 2, name: "wiosło", category: "woda", description: "dsfh dsfh fsdhsd hdsfh", price: 23.12},
      { id: 3, name: "krzesło", category: "boks", description: "qwreq wer qwrwq rqwerqwerqw", price: 13.32},
      { id: 4, name: "rękawice", category: "boks", description: "zxC  Z v av a sa dfsa", price: 700.78},
      { id: 5, name: "pas", category: "karate", description: " tyuiytity  y ity ityiyti utyu iyt yt u", price: 9.99},
    ]);
  };

  storeOrder(): Promise<number> {
    console.log("złożenie zamówienia");
    console.log(JSON.stringify(this.order));
    return Promise.resolve(1);
  };
};