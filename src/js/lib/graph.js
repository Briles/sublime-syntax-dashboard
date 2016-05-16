(function () {
  'use strict';

  function findMax(data, prop) {
    return Math.max.apply(null, data.map(function (x) {
      return x[prop];
    }));
  }

  function BarGraph(conf) {
    if (!(this instanceof BarGraph)) {
      return new BarGraph(arguments);
    }

    this.data = conf.data;

    this.graphOffset = 30;
    this.barOffset = 18;
    this.totalOffset = this.graphOffset + this.barOffset;

    this.barWidth = 15;
    this.barMargin = 2;
    this.barTotalWidth = this.barWidth + this.barMargin;

    this.yOffset = 5;

    this.height = 100;
    this.graphHeight = this.height + 10;
    this.width = this.data.length * this.barTotalWidth + this.totalOffset - this.barMargin;
    this.max = findMax(this.data, 'count');
    this.axis = {};

    return this;
  }

  BarGraph.prototype.barHeight = function (val) {
    return val / this.max * this.height;
  };

  BarGraph.prototype.barX = function (idx) {
    return idx * this.barTotalWidth + (this.barOffset / 2);
  };

  BarGraph.prototype.barY = function (val) {
    return this.height - (val / this.max * this.height) + this.yOffset;
  };

  BarGraph.prototype.makeYAxis = function (conf) {
    var axis = [];

    var scale = conf.scale - 1;
    var offset = this.yOffset;
    var data = this.data;

    offset = !angular.isNumber(offset) ? 0 : offset;
    var inc = this.max / scale;
    var yInc = this.height / scale;
    var r = 0;

    for (var i = scale; i >= 0; i--) {
      axis.push({
        label: Math.round(i * inc),
        y: yInc * r + offset,
        lineLength: data.length * this.barTotalWidth + this.barOffset,
      });
      r++;
    }

    this.axis.y = axis;
  };

  module.exports = {
    Bar: BarGraph,
  };
}());
