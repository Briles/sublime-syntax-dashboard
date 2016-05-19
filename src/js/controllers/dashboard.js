module.exports = function ($scope, $http, $location) {
  'use strict';

  var lsCacheKey = 'ssdash_syntax_cache';
  var Graph = require('../lib/graph.js');
  var cdnFragment = 'https://cdn.rawgit.com/Briles/sublime-syntax-dashboard/gh-pages/src/data/';

  $scope.syntaxes = require('../lib/syntaxes.js');
  $scope.allData = angular.fromJson(localStorage.getItem(lsCacheKey)) || {};

  $scope.scopeFilter = '';
  $scope.scopeOrderBy = 'scope';
  $scope.scopeOrderRev = false;

  $scope.fetchSyntaxData = function (name) {
    name = name.toLowerCase();
    name = name in $scope.syntaxes ? $scope.syntaxes[name] : 'ActionScript';

    if (name in $scope.allData) {
      setSyntaxData(name);
    } else {
      $http({
        method: 'GET',
        url: cdnFragment + encodeURIComponent(name) + '.json',
      }).then(function successCallback(response) {
        $scope.allData[name] = response.data;
        setSyntaxData(name);
        localStorage.setItem(lsCacheKey, angular.toJson($scope.allData));
      });
    }
  };

  $scope.fetchSyntaxData($location.path().slice(1));

  function setSyntaxData(name) {
    $scope.navIsActive = false;
    $scope.syntaxData = $scope.allData[name];
    var historicalData = $scope.syntaxData.history;
    var scopesCountGraph = new Graph.Bar({
      data: historicalData.scope_counts,
    });
    scopesCountGraph.makeYAxis({
      scale: 5,
    });
    $scope.graph = scopesCountGraph;
    $scope.syntax = $scope.syntaxData.name;
    $location.path($scope.syntax);
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
