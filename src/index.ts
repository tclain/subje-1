import { isRangeSignificant, RangeTupple, isRange } from "./range";
/** a map that associate a number and a boolean indicating is this number is used in a range */
type RangeMap = Map<number, boolean>;

/**
 * RangeCollection class
 */
export class RangeCollection {
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
    // check boundaries types
    if (!isRange(range)) throw new RangeError("this is not a range");
    if (!isRangeSignificant(range)) return;
    const [lowerTarget, upperTarget] = range;

    if (this.smallestNumber === undefined || lowerTarget < this.smallestNumber)
      this.smallestNumber = lowerTarget;
    // update the global ranges
    if (this.largestNumber === undefined || upperTarget > this.largestNumber)
      this.largestNumber = upperTarget;

    let index = lowerTarget;
    // updating the values depending on the operation
    while (index < upperTarget) {
      this.rangeMap.set(index, operation === "add");
      index++;
    }
    this.rangeMap.set(this.largestNumber, false);
  };

  /**
   * trasverse the range [lowestNumer, largestNumber] and resconstruc the intervals inside an array
   */
  toRangesList = (): RangeTupple[] => {
    /** the list of ranges to return  */
    const ranges: RangeTupple[] = [];
    let index = this.smallestNumber;
    /** store the current constructed range */
    let rangeLower = undefined;
    let lastIndexInRange = 0;
    let rangeToInsert = [];
    while (index++ <= this.largestNumber) {
      // utils booleans
      const realIndex = index - 1;
      const aRangeHasStarted = rangeToInsert.length > 0;
      const noRangeStarted = !aRangeHasStarted;
      const currentItemIsInARange = this.rangeMap.get(realIndex) === true;
      const currentItemShouldNotBeInARange =
        !this.rangeMap.has(realIndex) || this.rangeMap.get(realIndex) === false;
      const currentItemBelongsToTheCurrentRange =
        currentItemIsInARange &&
        aRangeHasStarted &&
        lastIndexInRange === realIndex - 1;
      const currentItemIsInARangeButNoTheCurrent =
        currentItemIsInARange && !currentItemBelongsToTheCurrentRange;
      // no in a range
      if (noRangeStarted && currentItemShouldNotBeInARange) continue;
      if (
        aRangeHasStarted &&
        (currentItemShouldNotBeInARange || currentItemIsInARangeButNoTheCurrent)
      ) {
        rangeToInsert.push(lastIndexInRange + 1);
        ranges.push(rangeToInsert as RangeTupple);
        rangeToInsert = [];

        if (currentItemIsInARangeButNoTheCurrent) {
          rangeToInsert.push(realIndex);
        }
      }
      if (noRangeStarted && currentItemIsInARange) {
        rangeToInsert.push(realIndex);
        rangeLower = realIndex;
        lastIndexInRange = realIndex;
        continue;
      }

      if (currentItemIsInARange && currentItemBelongsToTheCurrentRange) {
        lastIndexInRange = realIndex;
        continue;
      }
    }
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
