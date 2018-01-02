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
                function NegotiationList() {
                    _classCallCheck(this, NegotiationList);

                    this._negotiations = [];
                }

                _createClass(NegotiationList, [{
                    key: "add",
                    value: function add(negotiation) {
                        this._negotiations.push(negotiation);

                        // Alternative: this attribution event is catched by proxy
                        // this._negotiations = [].concat(this._negotiations, negotiation);
                    }
                }, {
                    key: "empty",
                    value: function empty() {
                        this._negotiations = [];
                    }
                }, {
                    key: "order",
                    value: function order(criteria) {
                        this._negotiations.sort(criteria);
                    }
                }, {
                    key: "reverse",
                    value: function reverse() {
                        this._negotiations.reverse();
                    }
                }, {
                    key: "negotiations",
                    get: function get() {
                        // Blinding array list returning a copied version of negotiations list
                        return [].concat(this._negotiations);
                    }
                }, {
                    key: "totalVolume",
                    get: function get() {
                        return this._negotiations.reduce(function (total, n) {
                            return total + n.volume;
                        }, 0.0);
                    }
                }]);

                return NegotiationList;
            }());

            _export("NegotiationList", NegotiationList);
        }
    };
});
//# sourceMappingURL=NegotiationList.js.map