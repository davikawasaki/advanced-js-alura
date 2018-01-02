'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, HttpService;

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

            _export('HttpService', HttpService = function () {
                function HttpService() {
                    _classCallCheck(this, HttpService);
                }

                _createClass(HttpService, [{
                    key: '_errorHandler',
                    value: function _errorHandler(res) {
                        if (!res.ok) throw new Error(res.statusText);
                        return res;
                    }
                }, {
                    key: 'get',
                    value: function get(url) {
                        var _this = this;

                        // Using Fetch API from ES2016
                        // @see: https://braziljs.org/blog/fetch-api-e-o-javascript/
                        return fetch(url)
                        // Raw response to JSON
                        .then(function (res) {
                            return _this._errorHandler(res);
                        }).then(function (res) {
                            return res.json();
                        });

                        // Using Ajax object XMLHttpRequest
                        // return new Promise((resolve, reject) => {
                        //     let xhr = new XMLHttpRequest();
                        //     xhr.open('GET', url);
                        //     xhr.onreadystatechange = () => {
                        //         if(xhr.readyState == 4) {
                        //             if(xhr.status == 200) {
                        //                 resolve(JSON.parse(xhr.responseText));
                        //             } else {
                        //                 console.log(xhr.responseText);
                        //                 reject(xhr.responseText);
                        //             }
                        //         }
                        //     }
                        //     xhr.send();
                        // });
                    }
                }, {
                    key: 'post',
                    value: function post(url, data) {
                        var _this2 = this;

                        // Using Fetch API from ES2016
                        return fetch(url, {
                            headers: { 'Content-type': 'application/json' },
                            method: 'post',
                            body: JSON.stringify(data)
                        })
                        // Raw response to JSON
                        .then(function (res) {
                            return _this2._errorHandler(res);
                        });

                        // Using Ajax object XMLHttpRequest
                        // return new Promise((resolve, reject) => {
                        //     let xhr = new XMLHttpRequest();
                        //     xhr.open("POST", url, true);
                        //     xhr.setRequestHeader("Content-type", "application/json");
                        //     xhr.onreadystatechange = () => {
                        //         if (xhr.readyState == 4) {
                        //             if (xhr.status == 200) {
                        //                 resolve(JSON.parse(xhr.responseText));
                        //             } else {
                        //                 reject(xhr.responseText);
                        //             }
                        //         }
                        //     };
                        //     // JSON.stringifly to convert an object in a JSON-format string
                        //     xhr.send(JSON.stringify(data));
                        // });
                    }
                }]);

                return HttpService;
            }());

            _export('HttpService', HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map