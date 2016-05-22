var app = angular.module('syntaxDash', []);

app.filter('encodeURIComponent', require('../filters/url-encode.js'));

app.controller('syntaxDashCtrl', require('./dashboard.js'))
  .directive('svgTooltip', require('../directives/tooltip.js'))
  .directive('aggStat', require('../directives/agg-stat.js'));
