type RangeTupple = [number, number];
const isRangeSignificant = (range: RangeTupple) => range[0] !== range[1];
/** a map that associate a number and a boolean indicating is this number is used in a range */
type RangeMap = Map<number, boolean>;

/**
 * RangeCollection class
 */
class RangeCollection {
  constructor(
    public rangeMap: RangeMap = new Map(),
    public smallestNumber = undefined,
    public largestNumber = undefined
  ) {}
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

  edit = (operation: "add" | "remove", range: RangeTupple) => {
    /** if the range is not significant, ignore the  */
    console.log();
    console.log();
    console.log(operation, range, this.rangeMap);
    if (!isRangeSignificant(range)) return;
    const [lowerTarget, upperTarget] = range;

    if (this.smallestNumber === undefined || lowerTarget < this.smallestNumber)
      this.smallestNumber = lowerTarget;
    // update the global ranges
    if (this.largestNumber === undefined || upperTarget > this.largestNumber)
      this.largestNumber = upperTarget;

    let index = lowerTarget;
    // updating the values depending on the operation
    console.log("Ill go from ", lowerTarget, upperTarget);
    while (index < upperTarget) {
      this.rangeMap.set(index, operation === "add");
      index++;
    }
    this.rangeMap.set(this.largestNumber, false);
    console.log("RESULT IS ", this.rangeMap, [
      this.smallestNumber,
      this.largestNumber
    ]);
  };

  /**
   * trasverse the range [lowestNumer, largestNumber] and resconstruc the intervals inside an array
   */
  toRangesList = (): RangeTupple[] => {
    console.log();
    console.log();
    console.log();
    /** the list of ranges to return  */
    const ranges: RangeTupple[] = [];

    let index = this.smallestNumber;
    /** store the current constructed range */
    let lowerBoundRange = undefined;
    let lastIndexInRange = 0;
    while (index++ <= this.largestNumber) {
      const realIndex = index - 1;
      console.log("STEP", realIndex);
      const currentIndexIsInARange = this.rangeMap.get(realIndex) === true;
      console.log(
        "​RangeCollection -> currentIndexIsInARange",
        currentIndexIsInARange
      );
      const currentIndexIsNotInARange = this.rangeMap.get(realIndex) === false;
      console.log(
        "​RangeCollection -> currentIndexIsNotInARange",
        currentIndexIsNotInARange
      );
      const currentIndexIsNotInCurrentRange =
        realIndex === lastIndexInRange + 1;

      console.log(
        "​RangeCollection -> currentIndexIsNotInCurrentRange",
        currentIndexIsNotInCurrentRange
      );
      const currentIndexIsInCurrentRange = !currentIndexIsNotInCurrentRange;
      console.log(
        "​RangeCollection -> currentIndexIsInCurrentRange",
        currentIndexIsInCurrentRange
      );
      const noCurrentRange = lowerBoundRange === undefined;
      console.log("​RangeCollection -> noCurrentRange", noCurrentRange);
      const hasCurrentRange = !noCurrentRange;
      console.log("​RangeCollection -> hasCurrentRange", hasCurrentRange);

      /*
      console.log("index", realIndex);
      console.log({
        currentIndexIsAdjacentToCurrentRange,
        currentIndexIsInARange,
        currentIndexIsNotInARange,
        noCurrentRange,
        lowerBoundRange
      });
      */

      if (hasCurrentRange && currentIndexIsInCurrentRange) {
        console.log("MOVE LAST INDEX IN RANGE");
        lastIndexInRange = realIndex;
        continue;
      }
      if (
        hasCurrentRange &&
        ((currentIndexIsInARange && currentIndexIsNotInCurrentRange) ||
          currentIndexIsNotInARange)
      ) {
        console.log("FLUSH");
        // flush the current range
        // push the new range
        ranges.push([lowerBoundRange, lastIndexInRange + 1]);
        lowerBoundRange = undefined;
        continue;
      }

      if (currentIndexIsInARange && noCurrentRange) {
        console.log(realIndex, index, lastIndexInRange);
        lowerBoundRange = realIndex;
        lastIndexInRange = realIndex;
        continue;
      }

      if (currentIndexIsNotInARange) {
        if (!noCurrentRange) {
          ranges.push([lowerBoundRange, realIndex]);
          lowerBoundRange = undefined;
        }
      }
    }
    console.log(ranges);
    return ranges;
  };

  /**
   * Prints out the list of ranges in the range collection
   */
  print = (logger = console.log) => {
    logger(
      this.toRangesList()
        .map(([lower, upper]) => `[${lower}, ${upper})`)
        .join(" ")
    );
  };
}

console.clear();
console.log("NEW --------------- START");

const rc = new RangeCollection();

rc.add([1, 5]);
rc.print();
// Should display: [1, 5)

rc.add([10, 20]);
rc.print();
// Should display: [1, 5) [10, 20)

rc.add([20, 20]);
rc.print();

// Should display: [1, 5) [10, 20)
rc.add([20, 21]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([2, 4]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([3, 8]);
rc.print();
// Should display: [1, 8) [10, 21)

/*
rc.remove([10, 10]);
rc.print();
// Should display: [1, 8) [10, 21)

rc.remove([10, 11]);
rc.print();
// Should display: [1, 8) [11, 21)

rc.remove([15, 17]);
rc.print();
// Should display: [1, 8) [11, 15) [17, 21)

rc.remove([3, 19]);
rc.print();
// Should display: [1, 3) [19, 21)
*/
