import { LocalDataSource } from "./data/localDataSource";
import { HtmlDisplay } from './htmlDisplay';
import "bootstrap/dist/css/bootstrap.css";

// utworzenie data source
let ds = new LocalDataSource();

async function displatData() {

  // utworzenie widoku elementu
  let display = new HtmlDisplay();

  // ustalenie jego propsów
  display.props = {
    dataSource: ds
  };

  // wywołoanie wjego zawartości
  return display.getContent();
};


document.onreadystatechange = () => {
  if(document.readyState === "complete") {
    displatData().then(elem => {
      
      // odszukanie elementu HTML do którego wstrzyknięta będzie aplikacja
      let rootelement = document.getElementById("app");

      // dodanie do niego wygenerowanego elementu
      rootelement.innerHTML = "";
      rootelement.appendChild(elem);
    });
  };
};














// async function displayData(): Promise<string> {
  
//   let ds = new LocalDataSource();
//   let allProducts = await ds.getProducts("name");
//   let categories = await ds.getCategories();
//   let boxProducts = await ds.getProducts("name", "boks");

//   let result = "";

//   allProducts.forEach((product) => result += `Produkt: ${product.name}, ${product.category} \n`);
//   categories.forEach((category) => result += `Kategoria to: ${category}\n`);
//   boxProducts.forEach((boxProduct) => ds.order.addProduct(boxProduct, 1));

//   result += `Wartość całkowita zamówienia: ${ds.order.total.toFixed(2)} zł.`;
//   return result
// };

// displayData().then(res => console.log(res));
