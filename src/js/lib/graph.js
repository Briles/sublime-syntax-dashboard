(function () {
  'use strict';

  var graphColors = ['green', 'red', 'purple', 'orange', 'pink', 'aqua', 'lime', 'yellow'];

  function findMax(data, prop) {
    return Math.max.apply(null, data.map(function (x) {
      return x[prop];
    }));
  }

  function Bar(properties) {
    if (!(this instanceof Bar)) {
      return new Bar(properties);
    }

    var dimHeight = properties.dimHeight;

    this.height = isNaN(dimHeight) ? 0 : dimHeight;
    this.x = properties.dimX;
    this.y = properties.gHeight - this.height;
    this.xProp = properties.xProp;
    this.value = properties.value;

    return this;
  }

  function makeBars(_i) {
    var bars = [];
    var yProp = _i.yProp;
    var data = _i.data;
    var max = findMax(data, yProp);
    var height = _i.height;

    angular.forEach(data, function (yObj, idx) {
      var value = yObj[yProp];
      var bar = new Bar({
        gHeight: height,
        dimHeight: (value / max * height),
        dimX: (idx * _i.barTotalWidth),
        xProp: yObj[_i.xProp],
        value: value,
      });
      bars.push(bar);
    });

    return bars;
  }

  function BarGraph(conf) {
    if (!(this instanceof BarGraph)) {
      return new BarGraph(conf);
    }

    for (var prop in conf) {
      this[prop] = conf[prop];
    }

    this.barTotalWidth = this.barWidth + this.barMargin;
    this.width = this.data.length * this.barTotalWidth - this.barMargin;
    this.bars = makeBars(this);

    return this;
  }

  BarGraph.prototype.setColor = function (index) {
    this.color = typeof index === 'string' ? index : graphColors[index];
  };

  BarGraph.prototype.build = function () {
    var _barWidth = this.barWidth;
    var ns = 'http://www.w3.org/2000/svg';

    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'svg-graph ' + this.color);
    svg.setAttribute('width', this.width);
    svg.setAttribute('height', this.height);
    var barWrapper = document.createElementNS(ns, 'g');
    svg.appendChild(barWrapper);

    angular.forEach(this.bars, function (bar) {
      var barEl = document.createElementNS(ns, 'g');
      barEl.setAttribute('transform', 'translate(' + bar.x + ', 0)');
      var tooltipContents = '<strong>' + bar.xProp + '</strong>: <strong>' + bar.value + '</strong>';
      barEl.setAttribute('svg-tooltip', tooltipContents);

      var rect = document.createElementNS(ns, 'rect');
      rect.setAttribute('width', _barWidth);
      rect.setAttribute('height', bar.height);
      rect.setAttribute('y', bar.y);

      barEl.appendChild(rect);
      barWrapper.appendChild(barEl);
    });

    return svg;
  };

  module.exports = {
    Bar: BarGraph,
  };
}());
