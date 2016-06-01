module.exports = function ($rootScope, $location) {
  'use strict';

  $rootScope.$on('$routeChangeSuccess', function () {
    $rootScope.currentView = $location.path().split('/')[1];
  });
};
