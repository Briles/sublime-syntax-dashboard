module.exports = function ($routeProvider) {
  $routeProvider
    .when('/syntaxes/:syntaxName', {
      templateUrl: 'partials/syntaxes.html',
      controller: 'syntaxesController',
    })
    .when('/aggregate', {
      templateUrl: 'partials/aggregate.html',
      controller: 'aggregateController',
    })
    .otherwise('/aggregate');
};
