(function () {
  var root = this,
    m, allong, snake;

  if (typeof require !== 'undefined') {
    m = require('mori');
    allong = require('allong.es');
  }

  snake = {
    FunctionalModel: {
      addPoints: allong.es.variadic(function (points) {
        return m.into_array(
          m.reduce(
            m.partial(m.map, m.sum),
            points)
        );
      })
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