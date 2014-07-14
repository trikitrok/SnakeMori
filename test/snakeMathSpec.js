'use strict';

var SnakeGame = require("../src/snake.js");

describe("Snake's functional model", function () {
  var fns = SnakeGame.FunctionalModel;

  it("adds points", function () {
    expect(fns.addPoints([1, 2], [2, 3], [-1, -2], [3, 5])).toEqual([5, 8]);
  });

  it("transforms a point in game space to a rectangle in screen space", function () {
    expect(fns.pointToScreenRectangle([5, 10])).toEqual([50, 100, 10, 10]);
  });

  it("creates an apple", function () {
    var apple = fns.createApple();

    expect(insideClosedOpenInterval(apple.location[0], 0, SnakeGame.Constants.width)).toBeTruthy();
    expect(insideClosedOpenInterval(apple.location[1], 0, SnakeGame.Constants.height)).toBeTruthy();
    expect(apple.color).toEqual([210, 50, 90]);
  });

  it("creates a snake", function () {
    var snake = fns.createSnake();

    expect(snake.body).toEqual([
      [1, 1]
    ]);
    expect(snake.direction).toEqual([1, 0]);
    expect(snake.color).toEqual([15, 160, 70]);
  });

  it("moves the snake in its direction", function () {
    var snake = fns.move(fns.createSnake());

    expect(snake.body).toEqual([
      [2, 1]
    ]);
    expect(snake.body.length).toBe(1);
  });

  it("also can make the snake grow when it moves it", function () {
    var snake = fns.move(fns.createSnake(), true);

    expect(snake.body).toEqual([
      [2, 1],
      [1, 1]
    ]);
    expect(snake.body.length).toBe(2);
  })

  it("tells when the game is won", function () {
    expect(fns.wins({body: new Array(SnakeGame.Constants.winLength)})).toBeTruthy();
    expect(fns.wins({body: new Array(SnakeGame.Constants.winLength - 1)})).toBeFalsy();
  });

  it("tells when the game is lost", function () {
    var snakeNotOverlapping = {body: [
        [1, 1],
        [1, 2],
        [1, 3]
      ]},
      snakeOverlapping = {body: [
        [1, 1],
        [1, 2],
        [1, 1]
      ]};

    expect(fns.loses(snakeNotOverlapping)).toBeFalsy();
    expect(fns.loses(snakeOverlapping)).toBeTruthy();
  });

  it("tells when the snake eats an apple", function () {
    var snake = {body: [
        [1, 1],
        [1, 2]
      ]},
      eatableApple = {location: [1, 1]},
      nonEatableApple = {location: [1, 2]};

    expect(fns.eats(snake, eatableApple)).toBeTruthy();
    expect(fns.eats(snake, nonEatableApple)).toBeFalsy();
  });

  it("turns a snake", function() {
    var snakeFacingEast = {direction: [1, 0]};

    expect(fns.turn(snakeFacingEast, [0, 1]).direction).toEqual([0, 1]);
  });

  function insideClosedOpenInterval(value, lowerLimit, upperLimit) {
    return value >= lowerLimit && value < upperLimit;
  }
});