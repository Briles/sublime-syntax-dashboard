module.exports = function ($routeProvider) {
  $routeProvider
    .when('/syntaxes/:syntaxName', {
      templateUrl: 'partials/syntaxes.html',
      controller: 'syntaxDashCtrl',
    })
    .otherwise('/syntaxes/ActionScript');
};
