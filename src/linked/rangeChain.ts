import { Linked } from "./base";
import { RangeValue } from "./types";
import {
  upperOutsideLeft,
  upperOutsideRight,
  overlapLeft,
  upperInside,
  lowerInside,
  lowerOutsideRight,
  lowerOutsideLeft
} from "./utils";

export class RangeChain extends Linked<RangeValue> {
  equals = (opt: Linked<RangeValue>) => {
    return (
      this.value.lower === opt.value.lower &&
      this.value.upper === opt.value.upper
    );
  };
  currentToString = () => {
    return `[${this.value.lower}, ${this.value.upper})`;
  };
  chainToString = () => {
    let current: RangeChain = this;
    let index = 0;
    let stringRepresentation = "";
    while (current) {
      const { next } = current;
      const space = current.isTail() ? "" : " ";
      stringRepresentation += current.currentToString() + space;
      index++;
      current = next as RangeChain;
    }
    return stringRepresentation;
  };
  print = (logger = console.log) => {
    logger(this.chainToString());
  };

  /** try to resolve/merge the first bound of the given range */
  resolve = (range: RangeChain) => {
    const chain = this;
    let node = chain;
    while (node) {
      const insertBeforeFirst = node.isHead() && upperOutsideLeft(node, range);
      const insertAfterLast = node.isTail() && upperOutsideRight(node, range);
      const extendBefore = overlapLeft(node, range);
      const startInCurrent = lowerInside(node, range);
      const startAtUpperBound = node.value.upper === range.value.lower;
      const startBetweenCurrentAndNext =
        !node.isTail() &&
        upperOutsideRight(node, range) &&
        lowerOutsideLeft(node.next as RangeChain, range);

      if (insertBeforeFirst) {
        // outter first bound of the chain
        range.link(chain);
        return range;
      }
      if (insertAfterLast) {
        // insert after last node of chain
        // extend the last node
        if (startAtUpperBound) {
          node.value.upper = range.value.upper;
          // or enqueue it
        } else {
          node.link(range);
        }
        return chain;
      }
      if (extendBefore) {
        node.value.lower = range.value.lower;
        return chain;
      }

      if (startBetweenCurrentAndNext) {
        const saveNext = node.next;
        node.link(range);
        return this.resolveEnd(saveNext as RangeChain, range);
      }
      if (startInCurrent || startAtUpperBound) {
        console.log("startAtUpperBound", startAtUpperBound);
        return this.resolveEnd(node, range);
      }

      //if (node.)
      node = node.next as any;
    }
  };

  resolveEnd = (start: RangeChain, range: RangeChain) => {
    const chain = this;
    let node = start;
    while (node) {
      const next = node.next as RangeChain;
      const stopIn = upperInside(node, range);
      const stopBefore = upperOutsideLeft(node, range);
      const stopAfterChain = node.isTail() && upperOutsideRight(node, range);

      console.log("stop before", node.currentToString(), stopBefore);
      if (stopBefore) {
        start.value.upper = range.value.upper;
        start.next = node;
        return chain;
      }
      if (stopIn) {
        start.value.upper = node.value.upper;
        start.next = node.next as RangeChain;
        return chain;
      }
      if (stopAfterChain) {
        start.value.upper = range.value.upper;
        start.next = null;
        return chain;
      }
      node = next;
    }
  };
}
