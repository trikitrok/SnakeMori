'use strict';

(function () {
  var root = this,
    m, allongeLib,
    SnakeGame = {};

  if (typeof require !== 'undefined') {
    m = require('mori');
    allongeLib = require('allong.es');
  } else {
    m = mori;
    allongeLib = allong;
  }

  SnakeGame.Constants = {
    width: 75,
    height: 50,
    pointSize: 10,
    winLength: 5
  };

  SnakeGame.FunctionalModel = {
    addPoints: allongeLib.es.variadic(
      function (points) {
        return m.into_array(addPoints(points));
      }
    ),

    pointToScreenRectangle: function (point) {
      var rectangle = m.map(
        function (num) {
          return num * SnakeGame.Constants.pointSize;
        },
        [point[0], point[1], 1, 1]
      );
      return m.into_array(rectangle);
    },

    createApple: function () {
      return {
        location: [
          getRandomInt(0, SnakeGame.Constants.width),
          getRandomInt(0, SnakeGame.Constants.height)
        ],
        color: [210, 50, 90]
      };
    },

    createSnake: function () {
      return {
        body: [
          [1, 1]
        ],
        direction: [1, 0],
        color: [15, 160, 70]
      };
    },

    move: function (snake) {
      var snake = arguments[0],
        grow = arguments[1] || false,
        body = m.cons(
          this.addPoints(
            m.first(snake.body),
            snake.direction
          ),
          grow ?
            snake.body :
            m.take(snake.body.length - 1, snake.body)
        );

      return m.clj_to_js(
        m.assoc(m.js_to_clj(snake), "body", m.into_array(body))
      );
    },

    wins: function (snake) {
      return snake.body.length >= SnakeGame.Constants.winLength;
    },

    loses: headOverlapsBody,

    eats: function (snake, apple) {
      return sameLocation(getHead(snake), apple.location);
    },

    turn: function (snake, newDirection) {
      return m.clj_to_js(
        m.assoc(m.js_to_clj(snake), "direction", newDirection)
      );
    }
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = SnakeGame;
    }
    exports.SnakeGame = allongeLib;
  } else {
    root.SnakeGame = SnakeGame;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getHead(snake) {
    return m.first(snake.body);
  }

  function headOverlapsBody(snake) {
    var head = getHead(snake),
      restOfBody = m.rest(snake.body);

    return !m.every(
      function (elem) {
        return !sameLocation(elem, head);
      },
      restOfBody
    );
  }

  function sameLocation(pt1, pt2) {
    return pt1[0] === pt2[0] && pt1[1] === pt2[1];
  }

  function addPoints(points) {
    return m.reduce(
      m.partial(m.map, m.sum),
      points
    );
  };

}).call();