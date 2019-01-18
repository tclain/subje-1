## Implemetation

This directory contains a more performant approach to the problem of the range collection.

A chained list (`./base.ts`, extended by `RangeChain` in `rangeChain.ts`) is used to represent the list of ranges. This let us have a constant access time when going through the list and inserting / removing range bounds very easily as well.

O(N1) [N1 number of ranges] + O(1) for removal/add of new range complexity versus O(N2) [N2 differential between bounds] for the previous approach, but N2 >> N1 at scale ! Sweat and Blood though :-)

## Add

Once a new bound is submitted, this algorithm is used:

- if the chain of range is void, add the given range as the first
- else:
  - search for the first range affected by the lower bound of the given range
  - if the range should be inserted at the extreme bounds (before the first range or after the last one, do it)
  - if the given range overlaps on the left one range of the chain and:
    - is stopped _inside_ this same range, extend this range
    - is not stopped elsewhere, walk through the range from now to fetch the stop range and span everything in between (merge)
  - if the given range starts between two others range, insert one range here and go fetch the stop range
