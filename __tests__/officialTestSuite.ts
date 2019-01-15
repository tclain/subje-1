import { RangeCollection } from "../src/index";

// Example run

describe("rangeCollection/overview", () => {
  it("should behave as expected", () => {
    const logger = jest.fn();
    const rc = new RangeCollection();
    rc.print = rc.print.bind(rc, logger);

    rc.add([1, 5]);
    rc.print();

    // Should display: [1, 5)
    expect(logger).toHaveBeenLastCalledWith("[1, 5)");

    rc.add([10, 20]);
    rc.print();
    // Should display: [1, 5) [10, 20)
    expect(logger).toHaveBeenLastCalledWith("[1, 5) [10, 20)");

    rc.add([20, 20]);
    rc.print();
    // Should display: [1, 5) [10, 20)
    expect(logger).toHaveBeenLastCalledWith("[1, 5) [10, 20)");

    rc.add([20, 21]);
    rc.print();
    // Should display: [1, 5) [10, 21)
    expect(logger).toHaveBeenLastCalledWith("[1, 5) [10, 21)");

    rc.add([2, 4]);
    rc.print();
    // Should display: [1, 5) [10, 21)
    expect(logger).toHaveBeenLastCalledWith("[1, 5) [10, 21)");

    rc.add([3, 8]);
    rc.print();
    // Should display: [1, 8) [10, 21)
    expect(logger).toHaveBeenLastCalledWith("[1, 8) [10, 21)");

    rc.remove([10, 10]);
    rc.print();
    // Should display: [1, 8) [10, 21)
    expect(logger).toHaveBeenLastCalledWith("[1, 8) [10, 21)");

    /*
    rc.remove([10, 11]);
    rc.print(logger);
    // Should display: [1, 8) [11, 21)
    expect(lastLog).toBe("[1, 8) [11, 21)");

    rc.remove([15, 17]);
    rc.print();
    // Should display: [1, 8) [11, 15) [17, 21)
    expect(lastLog).toBe("[1, 8) [11, 15) [17, 21)");

    rc.remove([3, 19]);
    rc.print();
    // Should display: [1, 3) [19, 21)
    expect(lastLog).toBe("[1, 3) [19, 21)");
    */
  });
});
