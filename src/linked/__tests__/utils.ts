import {
  rangeIsNotSignificant,
  lowerInside,
  lowerOutsideRight,
  toChain,
  toRange,
  upperInside,
  overlapRight,
  upperOutsideLeft,
  lowerOutsideLeft,
  overlapLeft,
  upperOutsideRight
} from "../utils";

describe("utils", () => {
  it("rangeIsNotSignificant should returns false the upper is equal to the lower", () => {
    expect(rangeIsNotSignificant([1, 1])).toBeFalsy();
  });
});
