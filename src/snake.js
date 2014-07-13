(function () {
  var root = this,
    m, allongeLib, snake = {},
    reduceToArray,
    mapToArray;

  if (typeof require !== 'undefined') {
    m = require('mori');
    allongeLib = require('allong.es');
  } else {
    m = mori;
    allongeLib = allong;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function extend(consumer, provider) {
    allongeLib.es.mixin(provider).call(consumer);
    return consumer;
  }

  reduceToArray = m.comp(m.into_array, m.reduce);
  mapToArray = m.comp(m.into_array, m.map);

  snake.constants = extend({}, {
    width: 75,
    height: 50,
    pointSize: 10
  });

  snake.FunctionalModel = extend({}, {
      addPoints: allongeLib.es.variadic(function (points) {
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
    exports.snake = allongeLib;
  } else {
    root.snake = snake;
  }

}).call();