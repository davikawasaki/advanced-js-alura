"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, NegotiationList;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("NegotiationList", NegotiationList = function () {
                function NegotiationList(viewFn) {
                    _classCallCheck(this, NegotiationList);

                    this._negotiations = [];
                    this._viewFn = viewFn;
                    // this._context = context;
                }

                _createClass(NegotiationList, [{
                    key: "add",
                    value: function add(negotiation) {
                        this._negotiations.push(negotiation);
                        // Call anonymous fn to update view with negotiationList from this
                        // Does not work with dynamic context, since the context NegotiationList
                        // is different from NegotiationCtrl
                        this._viewFn(this);

                        // Calling static method of Reflect, passing method to be called,
                        // its respective context and the received params
                        // Reflect.apply(this._viewFn, this._context, [this]);

                        // Calling static method with apply (ES5). Alternative before reflect in ES6.
                        // this._viewFn.apply(this._context, [this]);
                    }
                }, {
                    key: "empty",
                    value: function empty() {
                        this._negotiations = [];
                        this._viewFn(this);

                        // Reflect.apply(this._viewFn, this._context, [this]);

                        // this._viewFn.apply(this._context, [this]);
                    }
                }, {
                    key: "negotiations",
                    get: function get() {
                        // Blinding array list returning a copied version of negotiations list
                        return [].concat(this._negotiations);
                    }
                }]);

                return NegotiationList;
            }());

            _export("NegotiationList", NegotiationList);
        }
    };
});
//# sourceMappingURL=NegotiationListObserverPattern.js.map