import { createElement } from './tools/jsxFactory';

export class CategoryList {

  props: {
    categories: string[],
    selectedCategory: string,
    filterCallback: (selected: string) => void,
  };
  
  getCategoryButton(category?: string): HTMLElement {
    
    let selected = this.props.selectedCategory === undefined ? "Wszystkie" : this.props.selectedCategory;
    let btnClass = selected === category ? "btn-primary" : "btn-secondary";
  
    return (
      <button className={`btn btn-block ${btnClass}`} onclick={() => this.props.filterCallback(category)}>
        {category}
      </button>
    );
  };

  getContent(): HTMLElement {
    return (
      <div className="d-grid gap-1">
        {["Wszystkie", ...this.props.categories].map((category) => this.getCategoryButton(category))}
      </div>
    );
  };
};