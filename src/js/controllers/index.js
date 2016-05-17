var app = angular.module('syntaxDash', []);

app.controller('syntaxDashCtrl', require('./dashboard.js'))
  .directive('svgTooltip', require('../directives/tooltip.js'));
