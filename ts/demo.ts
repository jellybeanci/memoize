import {memoize} from "./index";
import {sleep} from "@jellybeanci/sleep";
import {randomInt} from "@jellybeanci/random";
import {tryCatch, tryCatchFunction} from "./try-catch";


function tryCatchWrapper<T>(callback: (...args: any) => T): (...args: any) => [T | null, any] {
    return function (...args: any): [T | null, any] {
        try {
            const value: T = callback.apply(this, args);
            return [value, null];
        } catch (exception) {
            return [null, exception];
        }
    }
}

class Main {

    @memoize(5)
    static fibonacci(n: number): bigint {
        if (n < 2) return 1n;
        return Main.fibonacci(n - 2) + Main.fibonacci(n - 1);
    }

    @memoize()
    static async hardProblem(n: number): Promise<number> {
        await sleep(300);
        return n * 2;
    }

    static fiftyFifty(): number | any[] {
        const rand = randomInt(10);
        if (rand > 5) {
            throw Error("Fifty Error!");
        }
        return rand;
    }

    static fiftyFiftyImplicit(): [number, any] {
        try {
            const rand = randomInt(10);
            if (rand > 5) {
                throw Error("Fifty Error!");
            }
            return [rand, null];
        } catch (err) {
            return [null, err];
        }
    }


    static async main() {
        // const [value, error] = this.fiftyFiftyImplicit();

        const wrapedFifty = tryCatchFunction(this.fiftyFifty);

        const [value, error] = wrapedFifty();
        if (error) console.log("Error occured");
        else console.log("No Errors:", value);


        // console.log("Stage-1");
        // for (let i = 0; i < 5; i++) {
        //     console.log(await Main.hardProblem(i));
        // }
        // console.log("Stage-2");
        // for (let i = 0; i < 10; i++) {
        //     console.log(await Main.hardProblem(i));
        // }
        // console.log("End of the Line");
    }
}

Main.main();