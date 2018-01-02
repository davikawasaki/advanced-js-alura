"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProxyFactory = function () {
    function ProxyFactory() {
        _classCallCheck(this, ProxyFactory);
    }

    _createClass(ProxyFactory, null, [{
        key: "create",
        value: function create(obj, props, action) {
            return new Proxy(obj, {
                get: function get(target, prop, receiver) {
                    // Alternative: intercepting methods
                    if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                        // Changing object function on proxy with a new function, letting the original one intact
                        // Scope needs to be dynamic
                        return function () {
                            console.log("Intercepting method " + prop);
                            // Calling the original object method from target with arguments passed within his own scope
                            // Arguments is a implicit variable with access to method args when the method is called
                            var valueReturn = Reflect.apply(target[prop], target, arguments);

                            // Update view with controller scope and model, which is target
                            // JS method execution order: first get method reference, then apply it with params
                            action(target);

                            return valueReturn;
                        };
                    }

                    // Return property value of target
                    return Reflect.get(target, prop, receiver);
                },
                set: function set(target, prop, value, receiver) {

                    var proxyReturn = Reflect.set(target, prop, value, receiver);
                    if (props.includes(prop)) {
                        // Set new value for prop before updating view
                        // target[prop] = value;
                        action(target);
                    }
                    return proxyReturn;
                }
            });
        }
    }, {
        key: "_isFunction",
        value: function _isFunction(fn) {
            return (typeof fn === "undefined" ? "undefined" : _typeof(fn)) == (typeof Function === "undefined" ? "undefined" : _typeof(Function));
        }
    }]);

    return ProxyFactory;
}();
//# sourceMappingURL=ProxyFactory.js.map