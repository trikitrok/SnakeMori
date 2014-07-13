(function () {
  var m = require('mori'),
    allong = require('allong.es'),
    Math = {
      addPoints: allong.es.variadic(function (points) {
        return m.into_array(
          m.reduce(
            m.partial(m.map, m.sum),
            points)
        );
      })
    };

  module.exports.Math = Math;
})();