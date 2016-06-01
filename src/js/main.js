'use strict';

Array.prototype.last = function () {
  return this.slice(-1)[0];
};

Number.prototype.round = Number.prototype.round || function (decimals) {
  return Number(Math.round(this + 'e' + decimals) + 'e-' + decimals);
};

require('./controllers');
