var app = angular.module('syntaxDash', ['angular-loading-bar'])
  .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 0;
  }, ]);

app.controller('syntaxDashCtrl', require('./dashboard.js'))
  .directive('svgTooltip', require('../directives/tooltip.js'));
