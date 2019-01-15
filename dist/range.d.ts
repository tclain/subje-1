/** a range is a tuple of 2 number
 */
export declare type RangeTupple = [number, number];
/**
 * Checking if something is a range
 * @returns {boolean} true if the thing is a range
 */
export declare const isRange: (rangeLike: any) => rangeLike is [number, number];
export declare const normalizeRange: (range: [number, number]) => [number, number];
/** check if the range actually represents something meaningful
 * (Test )
 * @returns {boolean}
 */
export declare const isRangeSignificant: ([lower, upper]: [number, number]) => boolean;
/** serialize the range to a string */
export declare const rangeToString: (range: [number, number]) => string;
