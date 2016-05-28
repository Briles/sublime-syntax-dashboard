module.exports = function ($rootScope) {
  'use strict';

  return {
    setTitle: function setTitle(title) {
      $rootScope.title = title + ' · Sublime Syntax Dashboard';
    },
  };
};
