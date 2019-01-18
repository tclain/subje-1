import { RangeTupple } from "dist/range";
import { RangeChain } from "./rangeChain";
import { rangeIsNotSignificant, toChain } from "./utils";

export class RangeCollection {
  private chain: RangeChain;
  constructor(chain?: RangeChain) {
    this.chain =
      chain ||
      new RangeChain({
        lower: undefined,
        upper: undefined
      });
  }
  /**
   * Adds a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add = (range: RangeTupple) => {
    return this.edit("add", range);
  };

  /**
   * Removes a range from the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove = (range: RangeTupple) => {
    return this.edit("remove", range);
  };

  edit = (operation: "add" | "remove", range: RangeTupple): RangeChain => {
    const root = this.chain;
    if (rangeIsNotSignificant(range)) return root;

    const given: RangeChain = new RangeChain(toChain(range));
    const noInitialChain =
      root.value.lower === undefined || root.value.upper === undefined;
    console.log();
    console.log("RESOLVE", root.chainToString(), " |||| ", range);

    // in no range in the chain
    if (noInitialChain) {
      root.replace(given);
      return root;
    }
    const solved = root.resolve(given);
    return solved;
  };

  print = (logger = console.log) => {
    return this.chain.print(logger);
  };
}

console.clear();
const rc = new RangeCollection();

rc.add([1, 5]);
rc.print();

rc.add([10, 20]);
rc.print();
console.info("\nShould display: [1, 5) [10, 20)");

rc.add([20, 20]);
rc.print();
console.info("\nShould display: [1, 5) [10, 20)");

rc.add([7, 8]);
rc.print();
console.info("\nShould display: [1, 5) [10, 21)");

rc.add([20, 21]);
rc.print();
console.info("\nShould display: [1, 5) [10, 21)");

rc.add([2, 4]);
rc.print();
console.info("\nShould display: [1, 5) [10, 21)");

rc.add([3, 8]);
rc.print();
console.log("\nShould display: [1, 8) [10, 21)");

/*
rc.remove([10, 10]);
rc.print();
console.info("\nShould display: [1, 8) [10, 21)");

rc.remove([10, 11]);
rc.print();
console.info("\nShould display: [1, 8) [11, 21)");

rc.remove([15, 17]);
rc.print();
console.info("\nShould display: [1, 8) [11, 15) [17, 21)");

rc.remove([3, 19]);
rc.print();
console.info("\nShould display: [1, 3) [19, 21)");
*/
