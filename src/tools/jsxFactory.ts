export function createElement(tag: any, props: Object, ...children: Object[]): HTMLElement {

  function addChild(elem: HTMLElement, child: any) {
    elem.appendChild(child instanceof Node ? child : document.createTextNode(child.toString()));
  }

  if(typeof tag === "function") {
    return Object.assign(new tag(), { props: props || {} }).getContent();
  }

  const elem = Object.assign(document.createElement(tag), props || {});

  children.forEach(child => Array.isArray(child) ? child.forEach(child => addChild(elem, child)) : addChild(elem, child));

  return elem;
};

declare global {
  namespace JSX {
    interface ElementAttributesProperty { props; }
  }
}

// utworzenie funkcji creatora, funkcja która przetwarza przekazany JSX element i dodaje go JS'em do html
// wymagany jej import w każdym pliku .tsx