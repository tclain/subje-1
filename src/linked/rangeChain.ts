import { Linked } from "./base";
import { RangeValue } from "./types";
import {
  upperOutsideLeft,
  upperOutsideRight,
  overlapLeft,
  upperInside,
  lowerInside,
  lowerOutsideRight,
  lowerOutsideLeft,
  toChain
} from "./utils";
import { isRangeSignificant } from "../range";

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
  /** serialize the entire to string */
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
  resolve = (operation: "add" | "remove", range: RangeChain) => {
    console.log("SOLVE FOR ", operation);
    const isOperationAdd = operation === "add";
    const chain = this;
    let node = chain;
    while (node) {
      const opBeforeFirst = node.isHead() && upperOutsideLeft(node, range);
      const opAfterLast = node.isTail() && upperOutsideRight(node, range);
      const opBefore = overlapLeft(node, range);
      const startOpInCurrent = lowerInside(node, range);
      const startOpAtUpperBound = node.value.upper === range.value.lower;
      const startOpBetweenCurrentAndNext =
        !node.isTail() &&
        upperOutsideRight(node, range) &&
        lowerOutsideLeft(node.next as RangeChain, range);

      if (opBeforeFirst) {
        console.log("Snode is opBeforeFirst", node.currentToString());
        if (isOperationAdd) {
          range.link(chain);
          return range;
        } else return range;
      }
      if (opAfterLast) {
        console.log("Snode is opAfterLast ", node.currentToString());
        // remove ? ignore
        if (!isOperationAdd) return chain;
        // insert after last node of chain
        // extend the last node
        if (startOpAtUpperBound) {
          node.value.upper = range.value.upper;
          // or enqueue it
        } else {
          node.link(range);
        }
        return chain;
      }
      if (opBefore) {
        console.log("Snode is opBefore", node.currentToString());
        if (isOperationAdd) {
          node.value.lower = range.value.lower;
          return chain;
        } else {
          node.value.lower = range.value.upper;
          return chain;
        }
      }

      if (startOpInCurrent) {
        console.log("Snode is startOpInCurrent", node.currentToString());

        return this.resolveEnd(operation, node, range);
      }

      if (startOpAtUpperBound) {
        console.log("Snode is startOpAtUpperBound", node.currentToString());
        return this.resolveEnd(operation, node, range);
      }

      if (startOpBetweenCurrentAndNext) {
        console.log(
          "Snode is startOpBetweenCurrentAndNext",
          node.currentToString()
        );
        const saveNext = node.next;
        node.link(range);
        return this.resolveEnd(operation, saveNext as RangeChain, range);
      }

      //if (node.)
      node = node.next as any;
    }
  };

  /** fetch the matching range that will be affected by the upper bound of the given range */
  resolveEnd = (
    operation: "add" | "remove",
    start: RangeChain,
    range: RangeChain
  ) => {
    const chain = this;
    let node = start;
    while (node) {
      const next = node.next as RangeChain;
      const stopIn = upperInside(node, range);
      const stopBefore = upperOutsideLeft(node, range);
      const stopBetweenCurrentAndNext =
        upperOutsideRight(node, range) && upperOutsideLeft(node, range);
      const stopAfterChain = node.isTail() && upperOutsideRight(node, range);

      if (stopBefore) {
        start.value.upper = range.value.upper;
        start.next = node;
        return chain;
      }
      if (stopBetweenCurrentAndNext) {
        start.value.upper = range.value.upper;
        start.next = node.next as RangeChain;
        return chain;
      }
      if (stopIn) {
        if (operation === "remove") {
          if (upperInside(node, range)) {
            const saveLower = node.value.lower;
            node.value.lower = range.value.upper;
            console.log(node.currentToString());
            if (!isRangeSignificant([node.value.lower, node.value.upper])) {
              // update the link if the next one is not significant
              node.previous.next = node.isTail() ? null : node.next;
            } else {
              const next = node.next;
              node.next = new RangeChain(
                toChain([range.value.upper, node.value.upper])
              );
              node.next.next = next;
            }
          }
        }
        if (operation === "add") {
          start.value.upper = node.value.upper;
          start.next = node.next as RangeChain;
          return chain;
        }
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
