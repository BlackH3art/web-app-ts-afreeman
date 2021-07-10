import "reflect-metadata";

export const minimumValue = (propName: string, min : number) => (constructor: any, methodName: string, descriptor: PropertyDescriptor): any => {
  const originFunction = descriptor.value;

  descriptor.value = async function wrapper(...args) {
    let results = await originFunction.apply(this, args);

    return results.map(result => ({
      ...result,
      [propName]: result[propName] < min ? min : result[propName]
    }));
  }
}

export const addClass = (selector: string, ...classNames: string[]) => (constructor: any, methodName: string, descriptor: PropertyDescriptor): any => {

  if(Reflect.getMetadata("design:returntype", constructor, methodName) === HTMLElement) {
    const originFunction = descriptor.value;

    descriptor.value = function wrapper(...args) {

      let content: HTMLElement = originFunction.apply(this, args);
      content.querySelectorAll(selector).forEach((element) => classNames.forEach((singleClass) => {
        console.log('singleClassName --->', singleClass);
        
        element.classList.add(singleClass)
      }));

      return content;
    }
  }
}