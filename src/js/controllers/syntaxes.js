module.exports = function ($scope, $http, $location, $route, Page) {
  'use strict';

  var utils = require('../lib/utils.js');

  var lsCacheKey = 'ssdash_syntax_cache';

  $scope.syntaxes = require('../lib/syntaxes.js');
  var syntaxCache = {};

  $scope.tableFilter = '';
  $scope.tableOrderBy = 'value';
  $scope.tableOrderRev = false;

  $scope.tabs = [{
    label: 'Scopes',
    template: 'tab_scopes',
  }, {
    label: 'Includes',
    template: 'tab_includes',
  }, {
    label: 'Dependencies',
    template: 'tab_dependencies',
  }, ];
  $scope.activeTabIndex = 0;

  function setSyntaxData(name) {
    $scope.navIsActive = false;
    $scope.syntaxData = syntaxCache[name];
    var syntaxName = $scope.syntaxData.name;
    $scope.syntax = syntaxName;
    Page.setTitle(syntaxName + ' Syntax');
    var aggregate = angular.copy($scope.syntaxData.history.last());
    delete aggregate.tag;
    $scope.aggregate = aggregate;
    $scope.atAGlanceData = $scope.syntaxData.history;

    $scope.reports = {
      scopes: utils.generateReport($scope.syntaxData.scopes),
      includes: utils.generateReport($scope.syntaxData.includes),
    };
  }

  function fetchSyntaxData(name) {
    name = name.toLowerCase();
    name = name in $scope.syntaxes ? $scope.syntaxes[name] : 'ActionScript';

    if (name in syntaxCache) {
      setSyntaxData(name);
    } else {
      $http({
        method: 'GET',
        url: 'src/data/syntaxes/' + encodeURIComponent(name) + '.json',
      }).then(function (response) {
        syntaxCache[name] = response.data;
        setSyntaxData(name);
      });
    }
  }

  fetchSyntaxData($route.current.params.syntaxName);

  $scope.sortStatus = function (key) {
    var isCurrentKey = $scope.tableOrderBy === key;
    return {
      asc: isCurrentKey && !$scope.tableOrderRev,
      desc: isCurrentKey && $scope.tableOrderRev,
    };
  };

  $scope.orderBy = function (key) {
    if ($scope.tableOrderBy === key) {
      $scope.tableOrderRev = $scope.tableOrderRev === true ? false : true;
    } else {
      $scope.tableOrderRev = false;
    }

    $scope.tableOrderBy = key;
  };

  $scope.toggleNav = function () {
    $scope.navIsActive = $scope.navIsActive === true ? false : true;
  };

  $scope.setTab = function (idx) {
    $scope.activeTabIndex = idx;
    $scope.tabTemplate = $scope.tabs[idx].template;
  };

  $scope.setTab($scope.activeTabIndex);
};
