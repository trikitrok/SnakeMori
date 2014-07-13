var snake = require("../src/snake.js");

describe("Snake's functional model", function () {
  var fns = snake.FunctionalModel;

  it("adds points", function () {
    expect(fns.addPoints([1, 2], [2, 3], [-1,-2])).toEqual([2, 3]);
  });
});


