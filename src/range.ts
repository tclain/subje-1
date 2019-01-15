/** a range is a tuple of 2 number
 */
export type RangeTupple = [number, number];

/**
 * Checking if something is a range
 * @returns {boolean} true if the thing is a range
 */
export const isRange = (rangeLike: any): rangeLike is RangeTupple => {
  return (
    // we are dealing with an array
    rangeLike.map !== undefined &&
    // of length of 2
    rangeLike.length === 2 &&
    // and every member is a number
    (rangeLike as Array<any>).every(element => !isNaN(element))
  );
};

export const normalizeRange = (range: RangeTupple): RangeTupple => {
  const [first, last] = range;
  return first < last ? range : [last, first];
};

/** check if the range actually represents something meaningful
 * (Test )
 * @returns {boolean}
 */
export const isRangeSignificant = ([lower, upper]: RangeTupple): boolean => {
  return lower !== upper;
};

/** serialize the range to a string */
export const rangeToString = (range: RangeTupple): string =>
  `[${range[0]}, ${range[1]})`;
