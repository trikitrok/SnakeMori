(function () {
  var root = this,
    m, allong, snake,
    reduceToArray,
    mapToArray;

  if (typeof require !== 'undefined') {
    m = require('mori');
    allong = require('allong.es');
  }

  reduceToArray = m.comp(m.into_array, m.reduce);
  mapToArray = m.comp(m.into_array, m.map);

  snake = {
    FunctionalModel: {
      addPoints: allong.es.variadic(function (points) {
        return reduceToArray(
            m.partial(m.map, m.sum),
            points
        );
      }),

      pointToScreenRectangle: function (point) {
        var pointSize = 10;
        return mapToArray(
            function (num) {
              return num * pointSize;
            },
            [point[0], point[1], 1, 1]
        );
      }
    }
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = snake;
    }
    exports.snake = allong;
  } else {
    root.snake = snake;
  }

}).call();