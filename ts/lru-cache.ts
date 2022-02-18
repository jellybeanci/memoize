import * as hash from "object-hash";

export function lruCache() {
  const cache = new Map<string, any>();
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value; // fn
    descriptor.value = function (...args: any[]) {
      const argHash = hash(args);
      if (cache.has(argHash)) return cache.get(argHash);
      const result = original.apply(this, args);
      cache.set(argHash, result);
      return result;
    }
    return descriptor;
  };
}

export function logTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalValue = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    const startTime = Date.now();
    // Call the original function
    const result = await originalValue.apply(this, args);
    const deltaTime = Date.now() - startTime;
    console.log(deltaTime);
    return result;
  }
}