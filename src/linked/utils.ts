import { RangeTupple } from "dist/range";
import { RangeValue } from "./types";
import { RangeChain } from "./rangeChain";

////// utils
export function toRange(chain: RangeChain): RangeTupple {
  return chain ? [chain.value.lower, chain.value.upper] : null;
}

export function toChain(range: RangeTupple): RangeValue {
  if (range.length !== 2) return {};
  return {
    lower: range[0],
    upper: range[1]
  };
}

export function rangeIsNotSignificant(range: RangeTupple) {
  return range[0] === range[1];
}

export const upperOutsideLeft = (ref: RangeChain, predicate: RangeChain) => {
  return predicate.value.upper < ref.value.lower;
};
export const upperOutsideRight = (ref: RangeChain, predicate: RangeChain) => {
  return predicate.value.upper >= ref.value.upper;
};

export const lowerOutsideRight = (ref: RangeChain, predicate: RangeChain) => {
  return ref.value.upper <= predicate.value.lower;
};

export const lowerOutsideLeft = (ref: RangeChain, predicate: RangeChain) => {
  return predicate.value.lower < ref.value.lower;
};

export const overlapLeft = (ref: RangeChain, predicate: RangeChain) => {
  return (
    predicate.value.lower < ref.value.lower &&
    predicate.value.upper >= ref.value.lower
  );
};

export const overlapRight = (ref: RangeChain, predicate: RangeChain) => {
  return (
    predicate.value.lower >= ref.value.lower &&
    predicate.value.lower < ref.value.upper
  );
};

export const upperInside = (ref: RangeChain, predicate: RangeChain) => {
  return (
    predicate.value.upper >= ref.value.lower &&
    predicate.value.upper <= ref.value.upper
  );
};

export const lowerInside = (ref: RangeChain, predicate: RangeChain) => {
  return (
    predicate.value.lower >= ref.value.lower &&
    predicate.value.lower <= ref.value.upper
  );
};
