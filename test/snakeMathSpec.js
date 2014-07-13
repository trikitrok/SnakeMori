var snake = require("../src/snake.js");

describe("Snake's functional model", function () {
  var fns = snake.FunctionalModel;

  it("adds points", function () {
    expect(fns.addPoints([1, 2], [2, 3], [-1, -2])).toEqual([2, 3]);
  });

  it("transforms a point in game space to a rectangle in screen space", function () {
    expect(fns.pointToScreenRectangle([5, 10])).toEqual([50, 100, 10, 10]);
  });
});


