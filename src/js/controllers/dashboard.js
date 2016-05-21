module.exports = function ($scope, $http, $location) {
  'use strict';

  var lsCacheKey = 'ssdash_syntax_cache';
  var angular = window.angular;

  $scope.syntaxes = require('../lib/syntaxes.js');
  var syntaxCache = angular.fromJson(localStorage.getItem(lsCacheKey)) || {};

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
    $scope.syntax = $scope.syntaxData.name;
    $location.path($scope.syntax);

    var aggregate = angular.copy($scope.syntaxData.history.last());
    delete aggregate.tag;
    $scope.aggregate = aggregate;

    $scope.reports = {
      scopes: generateReport($scope.syntaxData.scopes),
      includes: generateReport($scope.syntaxData.includes),
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
        url: 'src/data/' + encodeURIComponent(name) + '.json',
      }).then(function successCallback(response) {
        syntaxCache[name] = response.data;
        setSyntaxData(name);
        localStorage.setItem(lsCacheKey, angular.toJson(syntaxCache));
      });
    }
  }

  $scope.$on('$locationChangeSuccess',
    function (e, url) {
      fetchSyntaxData(decodeURIComponent(url.split('/')[5]));
    });

  function indexOfObject(arr, key, val) {
    var idx = -1;
    angular.forEach(arr, function (el, i) {
      if (el[key] === val) {
        idx = i;
        return;
      }
    });

    return idx;
  }

  function generateReport(data) {
    var report = [];

    angular.forEach(data, function (value) {
      var objIdx = indexOfObject(report, 'value', value);
      if (objIdx === -1) {
        report.push({
          value: value,
          count: 1,
        });
      } else {
        report[objIdx].count += 1;
      }
    });

    return report;
  }

  $scope.clearCache = function () {
    syntaxCache = {};
    localStorage.clear();
    fetchSyntaxData($location.path().slice(1));
  };

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

  Array.prototype.last = function () {
    return this.slice(-1)[0];
  };
};
