'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, DateHelper;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

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

            _export('DateHelper', DateHelper = function () {
                function DateHelper() {
                    _classCallCheck(this, DateHelper);

                    throw new Error('This class cannot be instantiated!');
                }

                // Static methods: appertained to the class definition
                // Using template strings


                _createClass(DateHelper, null, [{
                    key: 'date2txt',
                    value: function date2txt(date) {
                        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                    }
                }, {
                    key: 'txt2date',
                    value: function txt2date(text) {

                        if (!/\d{2}\/\d{2}\/\d{4}$/.test(text)) throw new Error('Data deve estar no formato dd/mm/aaaa!');

                        // Version with spread operator
                        return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(text.split('/').reverse().map(function (item, index) {
                            return index == 1 ? item - 1 : item;
                        })))))();
                        // Alternative with module, which declares 1 for index equal to 1
                        // return item - index % 2

                        // Simpler version with split
                        // return new Date(text.split('-'));

                        // Date converts the given array to string with commas delimeters
                        // return new Date(text.split('-').join(','));

                        // Date converted with regex, changing every hyphen to comma
                        // return new Date(text.replace(/-/g, ','));
                    }
                }]);

                return DateHelper;
            }());

            _export('DateHelper', DateHelper);
        }
    };
});
//# sourceMappingURL=DateHelper.js.map