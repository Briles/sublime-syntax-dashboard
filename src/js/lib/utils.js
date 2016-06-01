module.exports = (function () {
  'use strict';

  function indexOfObject(arr, key, val) {
    var idx = -1;
    angular.forEach(arr, function (el, i) {
      if (el[key] === val) {
        idx = i;
        return;
      }
    });

    return idx;
  }

  return {
    indexOfObject: indexOfObject,
  };
}());
