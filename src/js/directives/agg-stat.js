module.exports = function ($compile) {
  'use strict';

  var Graph = require('../lib/graph.js');

  return {
    restrict: 'A',
    link: function ($scope, $element) {
      $scope.$watch(
        function () {
          return $scope.data;
        },

        function () {
          var labelVal = $scope.label;

          var graphConf = {
            data: $scope.atAGlanceData,
            height: 40,
            barMargin: 4,
            barWidth: 4,
            xProp: 'tag',
            yProp: labelVal,
          };
          var graph = new Graph.Bar(graphConf);
          graph.setColor($scope.$index);

          $element
            .empty()
            .append('<h3>' + labelVal + '</h3>')
            .append('<h2>' + $scope.data.round(2) + '</h2>')
            .append($compile(graph.build())($scope)[0]);
        });
    },
  };
};
