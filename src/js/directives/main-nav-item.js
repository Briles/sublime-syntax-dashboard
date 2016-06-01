module.exports = function () {
  'use strict';

  return {
    restrict: 'A',
    link: function ($scope, $element, $attrs) {
      var page = $attrs.mainNavItem;

      if (page === $scope.currentView) {
        $element.addClass('active');
      }
      console.log($scope.currentView);
    },
  };
};
