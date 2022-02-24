export function tryCatch() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any) {
      try {
        const value = original.apply(this, args);
        return [value, null];
      } catch (exception) {
        return [null, exception];
      }
    }
    return descriptor;
  };
}


export function tryCatchFunction<T, K>(functionCallback: (args: T) => K) {
  return function (args?: T): [K | null, any] {
    try {
      const value: K = functionCallback.apply(this, args);
      return [value, null];
    } catch (exception) {
      return [null, exception];
    }
  }
}