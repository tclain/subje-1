import {
  isRange,
  normalizeRange,
  rangeToString,
  isRangeSignificant
} from "../src/range";

describe("Range/is", () => {
  it("should check if something is a range", () => {
    expect(isRange([1, 2])).toBe(true);
  });
  it("should return false if the range is malformed", () => {
    expect(isRange([1])).toBe(false);
    expect(isRange([1, "bla"])).toBe(false);
    expect(isRange("something else")).toBe(false);
  });
});

describe("Range/normalize", () => {
  it("should return a sorted range", () => {
    expect(normalizeRange([2, 1])).toEqual([1, 2]);
    expect(normalizeRange([-3, 2])).toEqual([-3, 2]);
    expect(normalizeRange([1, 3])).toEqual([1, 3]);
  });
});

describe("Range/toString", () => {
  it("should serialize the range correctly ", () => {
    expect(rangeToString([1, 2])).toBe("[1, 2)");
  });
});

describe("Range/isSignificant", () => {
  it("should return true if the lower and upper ranges are different", () => {
    expect(isRangeSignificant([1, 1])).toBeFalsy();
    expect(isRangeSignificant([1, 2])).toBeTruthy();
  });
});

/*
describe("Range/numberIsInside", () => {
  it("should return true if the given number is inside the range", () => {
    const exampleRange = new Range([1, 3]);
    expect(exampleRange.numberIsInside(1)).toBe(true);
    expect(exampleRange.numberIsInside(2)).toBe(true);
    expect(exampleRange.numberIsInside(3)).toBe(false);
  });
});

describe("Range/outsideLowerBound", () => {
  it("should return true if the given range is outside - right, no overlap", () => {
    const exampleRange = new Range([1, 3]);
    const outside = new Range([-1, 0]);
    const overlapped = new Range([0, 2]);
    const lowerBoundTouching = new Range([0, 1]);
    expect(exampleRange.outsideLowerBound(outside)).toBe(true);
    expect(exampleRange.outsideLowerBound(overlapped)).toBe(false);
    expect(exampleRange.outsideLowerBound(lowerBoundTouching)).toBe(true);
  });
});

describe("Range/overlapLowerBound", () => {
  it("should return true if the given range is overlapping at our lower bound", () => {
    const exampleRange = new Range([1, 3]);
    const outside = new Range([-1, 0]);
    const overlapped = new Range([0, 2]);
    const lowerBoundTouching = new Range([0, 1]);
    expect(exampleRange.overlapLowerBound(outside)).toBe(false);
    expect(exampleRange.overlapLowerBound(overlapped)).toBe(true);
    expect(exampleRange.overlapLowerBound(lowerBoundTouching)).toBe(false);
  });
});

describe("Range/outsideUpperBound", () => {
  it("should return true if the given range is outside - right, no overlap", () => {
    const exampleRange = new Range([1, 3]);
    const outside = new Range([4, 5]);
    const upperBoundTouching = new Range([3, 5]);
    const overlapped = new Range([2, 5]);
    expect(exampleRange.outsideUpperBound(outside)).toBe(true);
    expect(exampleRange.outsideUpperBound(upperBoundTouching)).toBe(true);
    expect(exampleRange.outsideUpperBound(overlapped)).toBe(false);
  });
});

describe("Range/overlapUpperBound", () => {
  it("should return true if the given range is outside - right, no overlap", () => {
    const exampleRange = new Range([1, 3]);
    const outside = new Range([4, 5]);
    const upperBoundTouching = new Range([3, 5]);
    const overlapped = new Range([2, 5]);
    expect(exampleRange.overlapUpperBound(outside)).toBe(false);
    expect(exampleRange.overlapUpperBound(upperBoundTouching)).toBe(true);
    expect(exampleRange.overlapUpperBound(overlapped)).toBe(true);
  });
});

describe("Range/contains", () => {
  it("should return true if the given range is totally inside", () => {
    const exampleRange = new Range([1, 3]);
    const inside = new Range([1, 2]);
    const upperBoundTouching = new Range([2, 3]);
    const overlapped = new Range([2, 5]);
    expect(exampleRange.contains(inside)).toBe(true);
    expect(exampleRange.contains(upperBoundTouching)).toBe(false);
    expect(exampleRange.contains(overlapped)).toBe(false);
  });
});
*/
