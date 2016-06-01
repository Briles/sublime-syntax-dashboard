module.exports = function ($scope, $http, Page) {
  'use strict';

  Page.setTitle('Aggregate Data');

  $http({
    method: 'GET',
    url: 'src/data/aggregate.json',
  }).then(function (response) {
    var data = response.data.aggregate;
    $scope.atAGlanceData = data;
    var masterData = angular.copy(data.last());
    delete masterData.tag;
    $scope.aggregate = masterData;
  });
};
