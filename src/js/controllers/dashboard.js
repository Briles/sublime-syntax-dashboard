module.exports = function ($scope, $http, $location) {
  'use strict';

  var lsCacheKey = 'ssdash_syntax_cache';
  var Graph = require('../lib/graph.js');

  $scope.syntaxes = require('../lib/syntaxes.js');
  var syntaxCache = angular.fromJson(localStorage.getItem(lsCacheKey)) || {};

  $scope.scopeFilter = '';
  $scope.scopeOrderBy = 'scope';
  $scope.scopeOrderRev = false;

  $scope.fetchSyntaxData = function (name) {
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
  };

  $scope.fetchSyntaxData($location.path().slice(1));

  function setSyntaxData(name) {
    $scope.navIsActive = false;
    $scope.syntaxData = syntaxCache[name];
    $scope.syntax = $scope.syntaxData.name;
    $location.path($scope.syntax);
    var historicalData = $scope.syntaxData.history;
    var scopesCountGraph = new Graph.Bar({
      data: historicalData.scope_counts,
    });
    scopesCountGraph.makeYAxis({
      scale: 5,
    });
    $scope.graph = scopesCountGraph;
    var scopes = $scope.syntaxData.scopes;
    $scope.aggregate = {
      scopes: scopes.length,
      unique: uniq(scopes).length,
      'avg. specificity': specificity(scopes),
    };
    $scope.report = generateReport(scopes);
  }

  function uniq(arr) {
    var newArr = [];

    angular.forEach(arr, function (el) {
      if (newArr.indexOf(el) === -1) {
        newArr.push(el);
      }
    });

    return newArr;
  }

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

    angular.forEach(data, function (scope) {
      var objIdx = indexOfObject(report, 'scope', scope);
      if (objIdx === -1) {
        report.push({
          scope: scope,
          count: 1,
          specificity: scope.split('.').length,
        });
      } else {
        report[objIdx].count += 1;
      }
    });

    return report;
  }

  function specificity(scopes) {
    var specificity = 0;

    angular.forEach(scopes, function (scope) {
      specificity += scope.split('.').length;
    });

    return Math.round(specificity / scopes.length, 2);
  }

  $scope.sortStatus = function (key) {
    var isCurrentKey = $scope.scopeOrderBy === key;
    return {
      asc: isCurrentKey && !$scope.scopeOrderRev,
      desc: isCurrentKey && $scope.scopeOrderRev,
    };
  };

  $scope.orderBy = function (key) {
    if ($scope.scopeOrderBy === key) {
      $scope.scopeOrderRev = $scope.scopeOrderRev === true ? false : true;
    } else {
      $scope.scopeOrderRev = false;
    }

    $scope.scopeOrderBy = key;
  };

  $scope.toggleNav = function () {
    $scope.navIsActive = $scope.navIsActive === true ? false : true;
  };
};
