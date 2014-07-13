(function () {
  var root = this,
    m, allongeLib,
    snake = {},
    addPoints;

  if (typeof require !== 'undefined') {
    m = require('mori');
    allongeLib = require('allong.es');
  } else {
    m = mori;
    allongeLib = allong;
  }

  var addPoints = function (points) {
      return m.reduce(
        m.partial(m.map, m.sum),
        points
      );
  };

  snake.Constants = extend({}, {
    width: 75,
    height: 50,
    pointSize: 10
  });

  snake.FunctionalModel = extend({}, {
      addPoints: allongeLib.es.variadic(
        function (points) {
          return m.into_array(addPoints(points));
        }
      ),

      pointToScreenRectangle: function (point) {
        var rectangle = m.map(
          function (num) {
            return num * snake.Constants.pointSize;
          },
          [point[0], point[1], 1, 1]
        );
        return m.into_array(rectangle);
      },

      createApple: function () {
        return {
          location: [
            getRandomInt(0, snake.Constants.width),
            getRandomInt(0, snake.Constants.height)
          ],
          color: [210, 50, 90]
        };
      },

      createSnake: function () {
        return {
          body: [[1, 1]],
          direction: [1, 0],
          color: [15, 160, 70]
        };
      },

      move: function(snake) {
        var body = m.cons(
          this.addPoints(
            m.first(snake.body),
            snake.direction
          ),
          m.take(
            m.dec(m.count(snake.body)),
            snake.body
          )
        );

        return {
          body: m.into_array(body),
          direction: snake.direction,
          color: snake.color
        }
      }
    }
  );

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = snake;
    }
    exports.snake = allongeLib;
  } else {
    root.snake = snake;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function extend(consumer, provider) {
    allongeLib.es.mixin(provider).call(consumer);
    return consumer;
  }

}).call();