import { LocalDataSource } from "./data/localDataSource";

async function displayData(): Promise<string> {
  
  let ds = new LocalDataSource();
  let allProducts = await ds.getProducts("name");
  let categories = await ds.getCategories();
  let boxProducts = await ds.getProducts("name", "boks");

  let result = "";

  allProducts.forEach((product) => result += `Produkt: ${product.name}, ${product.category} \n`);
  categories.forEach((category) => result += `Kategoria to: ${category}\n`);
  boxProducts.forEach((boxProduct) => ds.order.addProduct(boxProduct, 1));

  result += `Wartość całkowita zamówienia: ${ds.order.total.toFixed(2)} zł.`;
  return result
};

displayData().then(res => console.log(res));
