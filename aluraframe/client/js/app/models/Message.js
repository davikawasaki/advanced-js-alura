'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {

    // Default for empty params: ''
    // constructor(text='') {
    function Message(text) {
        _classCallCheck(this, Message);

        this._text = text || '';
    }

    _createClass(Message, [{
        key: 'text',
        get: function get() {
            return this._text;
        },
        set: function set(text) {
            this._text = text;
        }
    }]);

    return Message;
}();
//# sourceMappingURL=Message.js.map