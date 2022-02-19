import * as hash from "object-hash";

export function memoize(limit: number = 128) {
  if (limit < 1) throw Error("Limit cannot be non-positive number!");
  const array: any[] = Array(limit);
  const cache = new Map<string, number>();
  let index = 0;

  function updateIndex(): void {
    index = (index + 1) % limit;
  }

  function setValue(key: string, value: any): void {
    cache.set(key, index);
    array[index] = value;
    updateIndex();
    return value;
  }

  function getValue(key: string): any {
    const cachedIndex = cache.get(key);
    return array[cachedIndex];
  }

  function hasValue(key: string): boolean {
    return cache.has(key);
  }

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const argHash: string = hash(args);
      if (hasValue(argHash)) return getValue(argHash);
      return setValue(argHash, original.apply(this, args));
    }
    return descriptor;
  };
}