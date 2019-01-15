import { isRangeSignificant, isRange } from "./range";
/**
 * RangeCollection class
 */
export class RangeCollection {
    constructor(rangeMap = new Map(), smallestNumber = undefined, largestNumber = undefined) {
        this.rangeMap = rangeMap;
        this.smallestNumber = smallestNumber;
        this.largestNumber = largestNumber;
        /**
         * Adds a range to the collection
         * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
         */
        this.add = (range) => {
            return this.edit("add", range);
        };
        /**
         * Removes a range from the collection
         * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
         */
        this.remove = (range) => {
            return this.edit("remove", range);
        };
        this.edit = (operation, range) => {
            // check boundaries types
            if (!isRange(range))
                throw new RangeError("this is not a range");
            if (!isRangeSignificant(range))
                return;
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
        this.toRangesList = () => {
            /** the list of ranges to return  */
            const ranges = [];
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
                const currentItemShouldNotBeInARange = !this.rangeMap.has(realIndex) || this.rangeMap.get(realIndex) === false;
                const currentItemBelongsToTheCurrentRange = currentItemIsInARange &&
                    aRangeHasStarted &&
                    lastIndexInRange === realIndex - 1;
                const currentItemIsInARangeButNoTheCurrent = currentItemIsInARange && !currentItemBelongsToTheCurrentRange;
                // no in a range
                if (noRangeStarted && currentItemShouldNotBeInARange)
                    continue;
                if (aRangeHasStarted &&
                    (currentItemShouldNotBeInARange || currentItemIsInARangeButNoTheCurrent)) {
                    rangeToInsert.push(lastIndexInRange + 1);
                    ranges.push(rangeToInsert);
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
        this.print = (logger = console.log) => {
            logger(this.toRangesList()
                .map(([lower, upper]) => `[${lower}, ${upper})`)
                .join(" "));
        };
    }
}
