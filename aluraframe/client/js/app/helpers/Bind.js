"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bind =

// REST operator for multiples params as an array string
// @see: https://www.smashingmagazine.com/2016/07/how-to-use-arguments-and-parameters-in-ecmascript-6/#rest-parameters
// The rest parameter has the same syntax as the spread operator,
// but instead of expanding an array into parameters,
// it collects parameters and turns them into an array.
function Bind(model, view) {
    _classCallCheck(this, Bind);

    for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        props[_key - 2] = arguments[_key];
    }

    var proxy = ProxyFactory.create(model, props, function (model) {
        return view.update(model);
    });
    // Initial model update
    view.update(model);
    return proxy;
};
//# sourceMappingURL=Bind.js.map