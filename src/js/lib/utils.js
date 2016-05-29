'use strict';

Number.prototype.round = Number.prototype.round || function (decimals) {
  return Number(Math.round(this + 'e' + decimals) + 'e-' + decimals);
};
