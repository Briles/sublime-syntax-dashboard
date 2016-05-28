var app = angular.module('syntaxDash', ['ngRoute']);

app
  .config(require('../routes.js'))
  .factory('Page', require('../services/page.js'))
  .controller('syntaxDashCtrl', require('./dashboard.js'))
  .directive('svgTooltip', require('../directives/tooltip.js'))
  .directive('aggStat', require('../directives/agg-stat.js'))
  .filter('encodeURIComponent', require('../filters/url-encode.js'));
