import { IObject } from '../interface';

export function getProperty(object: IObject, propertyPath: string): any {
  const props = propertyPath.split('.');

  return props.reduce((acc, prop) => (acc ? acc[prop] : acc), object);
}

export function setProperty(object: IObject, propertyPath: string, value: any) {
  const props = propertyPath.split('.');

  return props.reduce((acc, prop, index) => {
    // check if it is last property
    // if it is last one mutate accamulator and return full object
    if (index === props.length - 1) {
      acc[prop] = value;
      return object;
    }

    if (!acc[prop] || typeof acc[prop] !== 'object') {
      acc[prop] = {};
    }

    return acc[prop];
  }, object);
}

export function deepCopy(object: IObject) {
  return JSON.parse(JSON.stringify(object));
}
