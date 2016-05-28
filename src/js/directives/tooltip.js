module.exports = function () {
  'use strict';

  var tooltip = {
    hide: function () {
      var tooltipStyle = this.el.style;
      tooltipStyle.opacity = 0;
      tooltipStyle.visibility = 'hidden';
    },

    show: function () {
      var tooltipStyle = this.el.style;
      tooltipStyle.opacity = 1;
      tooltipStyle.visibility = 'visible';
    },
  };

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      tooltip.el = document.querySelectorAll('.svg-tooltip')[0];

      var rawEl = element[0];
      var tooltipContent = attrs.svgTooltip;
      var tooltipEl = tooltip.el;
      var tooltipStyle = tooltipEl.style;

      element.on('mouseover', function () {
        tooltipEl.innerHTML = tooltipContent;
        tooltipStyle.display = 'block';
        tooltip.hide();
        var tooltipHeight = tooltipEl.offsetHeight;
        var tooltipWidth = tooltipEl.offsetWidth;
        var tooltipOffset = 3;
        var boundElDim = rawEl.getBoundingClientRect();

        var top = boundElDim.top - tooltipHeight - 5 - tooltipOffset + window.pageYOffset;
        var left = boundElDim.left + boundElDim.width / 2 - tooltipWidth / 2 + window.pageXOffset;

        tooltipStyle.left = left + 'px';
        tooltipStyle.top = top + 'px';
        tooltip.show();
      });

      element.on('mouseout', function () {
        tooltip.hide();
        tooltipEl.style.display = 'none';
      });
    },
  };
};
