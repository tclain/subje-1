/**
 * Checking if something is a range
 * @returns {boolean} true if the thing is a range
 */
export const isRange = (rangeLike) => {
    return (
    // we are dealing with an array
    rangeLike.map !== undefined &&
        // of length of 2
        rangeLike.length === 2 &&
        // and every member is a number
        rangeLike.every(element => !isNaN(element)));
};
export const normalizeRange = (range) => {
    const [first, last] = range;
    return first < last ? range : [last, first];
};
/** check if the range actually represents something meaningful
 * (Test )
 * @returns {boolean}
 */
export const isRangeSignificant = ([lower, upper]) => {
    return lower !== upper;
};
/** serialize the range to a string */
export const rangeToString = (range) => `[${range[0]}, ${range[1]})`;
