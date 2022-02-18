import {memoize} from "./memoize";

class Main {

  @memoize(5)
  static fibonacci(n: number): bigint {
    if (n < 2) return 1n;
    return Main.fibonacci(n - 2) + Main.fibonacci(n - 1);
  }

  static main() {
    for (let i = 0; i < 20; i++) {
      console.log(Main.fibonacci(i));
    }
  }
}

Main.main();