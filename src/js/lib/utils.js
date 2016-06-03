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

  function generateReport(data) {
    var report = [];

    angular.forEach(data, function (value) {
      var objIdx = indexOfObject(report, 'value', value);
      if (objIdx === -1) {
        report.push({
          value: value,
          count: 1,
        });
      } else {
        report[objIdx].count += 1;
      }
    });

    return report;
  }

  return {
    indexOfObject: indexOfObject,
    generateReport: generateReport,
  };
}());
