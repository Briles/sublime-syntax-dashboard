module.exports = function ($scope, $http, $location, $route, Page) {
  'use strict';

  var utils = require('../lib/utils.js');

  var lsCacheKey = 'ssdash_base_scope_cache';

  $scope.baseScopes = require('../lib/base-scopes.js');
  var baseScopeCache = angular.fromJson(localStorage.getItem(lsCacheKey)) || {};

  $scope.tableFilter = '';
  $scope.tableOrderBy = 'count';
  $scope.tableOrderRev = true;

  function setScopeData(name) {
    console.log(name);
    $scope.navIsActive = false;
    $scope.scopeData = baseScopeCache[name];
    var scopeName = name;
    $scope.baseScope = scopeName;
    Page.setTitle(scopeName + ' Scope');

    $scope.scopes = utils.generateReport($scope.scopeData.scopes);
  }

  function fetchscopeData(name) {
    var lName = name.toLowerCase();
    name = lName in $scope.baseScopes ? $scope.baseScopes[lName] : 'Comment';

    if (name in baseScopeCache) {
      setScopeData(name);
    } else {
      $http({
        method: 'GET',
        url: 'src/data/scopes/' + encodeURIComponent(lName) + '.json',
      }).then(function (response) {
        baseScopeCache[name] = response.data;
        setScopeData(name);
        localStorage.setItem(lsCacheKey, angular.toJson(baseScopeCache));
      });
    }
  }

  fetchscopeData($route.current.params.baseScope);

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
};
