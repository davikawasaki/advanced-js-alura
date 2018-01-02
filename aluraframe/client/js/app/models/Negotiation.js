"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Negotiation = function () {
    function Negotiation(date, quantity, value) {
        _classCallCheck(this, Negotiation);

        // Private properties
        this._date = new Date(date.getTime());
        this._quantity = quantity;
        this._value = value;
        // Make object imutable
        Object.freeze(this);
    }

    _createClass(Negotiation, [{
        key: "isEqual",
        value: function isEqual(other) {
            return JSON.stringify(this) == JSON.stringify(other);
        }
    }, {
        key: "date",
        get: function get() {
            return new Date(this._date.getTime()); // Returning a copy of this._date object
        }
    }, {
        key: "quantity",
        get: function get() {
            return this._quantity;
        }
    }, {
        key: "value",
        get: function get() {
            return this._value;
        }
    }, {
        key: "volume",
        get: function get() {
            return this._quantity * this._value;
        }
    }]);

    return Negotiation;
}();
//# sourceMappingURL=Negotiation.js.map