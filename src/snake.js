(function () {
  var root = this,
    m, allong, snake = {},
    reduceToArray,
    mapToArray;

  if (typeof require !== 'undefined') {
    m = require('mori');
    allong = require('allong.es');
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  reduceToArray = m.comp(m.into_array, m.reduce);
  mapToArray = m.comp(m.into_array, m.map);

  snake.constants = allong.es.extend(
    {}, {
      width: 75,
      height: 50,
      pointSize: 10
    }
  );

  snake.FunctionalModel = allong.es.extend(
    {},
    {
      addPoints: allong.es.variadic(function (points) {
        return reduceToArray(
          m.partial(m.map, m.sum),
          points
        );
      }),

      pointToScreenRectangle: function (point) {
        return mapToArray(
          function (num) {
            return num * snake.constants.pointSize;
          },
          [point[0], point[1], 1, 1]
        );
      },

      createApple: function () {
        return {
          location: [getRandomInt(0, snake.constants.width), getRandomInt(0, snake.constants.height)],
          color: [210, 50, 90]
        };
      }
    }
  );

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = snake;
  }
  exports.snake = allong;
} else {
  root.snake = snake;
}

}).
call();