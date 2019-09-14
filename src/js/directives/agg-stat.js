module.exports = function ($compile, $timeout) {
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

          var graphEl = $compile(graph.build())($scope)[0];
          var graphContainer = document.createElement('div');
          graphContainer.style.width = '100%';
          graphContainer.style.height = graphConf.height + 20 + 'px';
          graphContainer.style.overflow = 'hidden';
          graphContainer.style['overflow-x'] = 'auto';
          graphContainer.appendChild(graphEl);

          $element
            .empty()
            .append('<h3>' + labelVal + '</h3>')
            .append('<h2>' + $scope.data.round(2) + '</h2>')
            .append(graphContainer);

          var timeout = $timeout(function () {
            graphContainer.scrollLeft = graphEl.getAttribute('width');
            $timeout.cancel(timeout);
          });
        });
    },
  };
};
