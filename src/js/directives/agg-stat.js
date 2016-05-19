module.exports = function () {
  'use strict';

  var aggregateData = require('../lib/aggregate.js');

  function compare(a, b) {
    return a - b;
  }

  function mapClass(a, b) {
    var comparison = compare(a, b);
    var result = 'eq';

    if (comparison < 0) {
      result = 'gt';
    } else if (comparison > 0) {
      result = 'lt';
    }

    return result;
  }

  return {
    restrict: 'A',
    link: function (scope, element) {
      scope.$watch(
        function () {
          return scope.data;
        },

        function () {
          element.empty();
          var label = scope.label;
          var data = scope.data;
          var value = '<h2 class="' + mapClass(aggregateData[label], data) + '">' + data + '</h2>';
          element.append(value).append('<h3>' + label + '</h3>');
        });
    },
  };
};
