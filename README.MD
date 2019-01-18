# J submission from tclain

Hi there and welcome to my solution of this very fun problem given by J !

# TLDR - How to run it.

This project is written in typescript to take advantage of the super-heroic IDE integrations and earlyon errors catch. The jest test runner is used to provide a safe an isolated execution environment.

```bash
npm install # install the testing architecture along with typescript transpiling
npm test # run the test cases
npm build # get an es6 version of the code in dist
```

## Analysis

The summary of the task is:

```
Task: Implement a 'Range Collection' class.
A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
A range collection is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)
```

A range is a pair of integers {N1, N2} that represent all the numbers between `N1 and N2 -1` [inclusive]. We can represent this in memory as a tuple,
or in ecmasript as an array of two element and use destructuration to simulate the tuple access.

```ts
// type guarantee
export type Range = [number, number];

const range: Range = [1, 5];

// name access to the tuple
const [lowerBound, upperBound] = range;
```

The range collection data is an array of ranges:

```ts
export type RangeCollectionData = Range[];
```

We're asked to implement to basic operation in the range collection: add, remove and print.

### Vocabulary.

A range contains an **lower bound** (the first and smaller element), and a **upper bound** (the second and greater element of the pair)

### Add and Remove

Let's look at theses test cases

```ts
rc.add([1, 5]);
rc.print();
// Should display: [1, 5)
```

(1) This one is pretty standard, we are adding the range to collection.

```ts
rc.add([10, 20]);
rc.print();
// Should display: [1, 5) [10, 20)
```

(2) Same here, I'm adding a range with **no overlapping** with bounds, so it will stack up after the first one.

```ts
rc.add([20, 20]);
rc.print();
// Should display: [1, 5) [10, 20)
```

(3) First edge case, if a range contains the same lower and upper bound, nothing happens

```ts
rc.add([20, 21]);
rc.print();
// Should display: [1, 5) [10, 21)
```

(4) Now we talk ! if we are adding a range, that extends the global range, we need to update the upper global bound to be upper bound of the provided range.

```ts
rc.add([2, 4]);
rc.print();
// Should display: [1, 5) [10, 21)
```

(5) if we are adding a range that is comprised inside one of the range of the collection, nothing changes

```ts
rc.add([3, 8]);
rc.print();
// Should display: [1, 8) [10, 21)
```

(6) And of course, if we adding a range that overlap inner bounds or inner ranges (not at the edges of the global range), we need to update the **overlapped** range with the new bound.

```ts
rc.remove([10, 10]);
rc.print();
// Should display: [1, 8) [10, 21)
```

(7) Now let's talk about removal of ranges. In this case the upper and lower bound are the same so the range is not significant.

```ts
rc.remove([10, 11]);
rc.print();
// Should display: [1, 8) [11, 21)
```

(8) If the given range overlaps one of the present ranges, updates the matching bound.

```ts
rc.remove([15, 17]);
rc.print();
// Should display: [1, 8) [11, 15) [17, 21)
```

(9) If the given range [A, B] to remove is **totally included in one present range [C,D]**, put a _hole_ inside by replace the range with two new ranges `[C, A]` and `[D,B]`

```ts
rc.remove([3, 19]);
rc.print();
// Should display: [1, 3) [19, 21)
```

# Implementation

The night is best advisor indeed. After approaching this problem as a suite of ranges, that I would need to merge, cut and delete. This generated a lot of code but It was not as elegant I would like (I needed to implement bound overlapping checking...), I've decided to go creative and see it as blank canvas (quite literally).

Basically I'm using the a `Hash` data type that let me store if a given number is inside a range or not + these information:

- the lowest bound of the lower range: `smallesNumber`
- the upper bound of the upper range: `largestNumber`

For instance at the start my hash is void, and my `smallesNumber` and `largestNumber` are resetted.

```ts
const rangeMap = {};
const lowestNumber = {};
const largestNumber = {};
```

I do have two basic operations : `add | edit` but the principle is the same
When I add a range `[A,B]`:

- I'm checking `lowestNumber` and `largestNumber` and updating them with the given range bound accordingly
- I'm going through each number is this range `(A to B-1)`:
  - if in `add` mode:
    - If the current number exists in the hash and have a true value (`O(1)`), I'm ignoring it, otherwise setting `true`
  - if in `remove` mode:
    - If the current number exists in the hash and have a false value (`O(1)`), I'm ignoring it, otherwise setting `false`

The complexity of the `add|edit` function is `O(n)`, with n the size of given range to add/remove.

My Hash is then able to give me the information: is a given number in a range => true | false.

When I need to display my ranges, I then need to reconstruct an array of ranges:

I'm looping from the `smallestNumber` to the `largestNumber`:

- if the current number has the value `true` in the hash and no range is being constructed, I'm started a range.
- if the current number has the value `false` in the hash and a range is being constructed, I'm closing this range and adding it to the list of ranges to return

The print is then trivial with `a map` and `a join`.

The complexity of the `print` function is `O(n)` when `n` is the distance between the `largestNumber` and the `largestNumber`
