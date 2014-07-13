var snake = require("../src/snake.js");

describe("SnakeMath", function () {
  it("adds points", function () {
    expect(snake.Math.addPoints([1, 2], [2, 3])).toEqual([3, 5]);
  });
});


