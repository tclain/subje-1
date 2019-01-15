/** a map that associate a number and a boolean indicating is this number is used in a range */
declare type RangeMap = Map<number, boolean>;
/**
 * RangeCollection class
 */
export declare class RangeCollection {
    rangeMap: RangeMap;
    smallestNumber: any;
    largestNumber: any;
    constructor(rangeMap?: RangeMap, smallestNumber?: any, largestNumber?: any);
    /**
     * Adds a range to the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add: (range: [number, number]) => void;
    /**
     * Removes a range from the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove: (range: [number, number]) => void;
    edit: (operation: "add" | "remove", range: [number, number]) => void;
    /**
     * trasverse the range [lowestNumer, largestNumber] and resconstruc the intervals inside an array
     */
    toRangesList: () => [number, number][];
    /**
     * Prints out the list of ranges in the range collection
     */
    print: (logger?: (message?: any, ...optionalParams: any[]) => void) => void;
}
export {};
