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
