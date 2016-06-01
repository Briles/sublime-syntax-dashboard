var app = angular.module('syntaxDash', ['ngRoute']);

app
  .run(require('../bootstrap.js'))
  .config(require('../routes.js'))
  .factory('Page', require('../services/page.js'))
  .controller('aggregateController', require('./aggregate.js'))
  .controller('syntaxesController', require('./syntaxes.js'))
  .directive('svgTooltip', require('../directives/tooltip.js'))
  .directive('aggStat', require('../directives/agg-stat.js'))
  .directive('mainNavItem', require('../directives/main-nav-item.js'))
  .filter('encodeURIComponent', require('../filters/url-encode.js'));
