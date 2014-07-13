(function () {
  var root = this,
    m, allongeLib,
    SnakeGame = {},
    addPoints;

  if (typeof require !== 'undefined') {
    m = require('mori');
    allongeLib = require('allong.es');
  } else {
    m = mori;
    allongeLib = allong;
  }

  addPoints = function (points) {
    return m.reduce(
      m.partial(m.map, m.sum),
      points
    );
  };

  SnakeGame.Constants = extend({}, {
    width: 75,
    height: 50,
    pointSize: 10
  });

  SnakeGame.FunctionalModel = extend({}, {
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

        return {
          body: m.into_array(body),
          direction: snake.direction,
          color: snake.color
        };
      }
    }
  );

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

  function extend(consumer, provider) {
    allongeLib.es.mixin(provider).call(consumer);
    return consumer;
  }

}).call();