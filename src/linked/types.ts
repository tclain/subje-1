///// types.ts
export type RelativePosition =
  | "overlap"
  | "outsideLeft"
  | "overlapLeft"
  | "equals"
  | "in"
  | "overlapRight"
  | "outsideRight";

export type RangeTupple = [number, number];
export type RangeValue = { upper?: number; lower?: number };
export type RangeChainValue = {
  value?: RangeValue;
  previous?: any;
  next?: any;
};
