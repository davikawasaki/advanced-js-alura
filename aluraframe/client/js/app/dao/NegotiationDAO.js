'use strict';

System.register(['../models/Negotiation'], function (_export, _context) {
    "use strict";

    var Negotiation, _createClass, NegotiationDAO;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegotiation) {
            Negotiation = _modelsNegotiation.Negotiation;
        }],
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

            _export('NegotiationDAO', NegotiationDAO = function () {
                function NegotiationDAO(connection) {
                    _classCallCheck(this, NegotiationDAO);

                    this._connection = connection;
                    this._store = 'negotiations';
                }

                _createClass(NegotiationDAO, [{
                    key: 'add',
                    value: function add(negotiation) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this._connection
                            // First, get transaction to an object store
                            .transaction([_this._store], 'readwrite')
                            // Second, get access to a transactional store through a transaction
                            .objectStore(_this._store)
                            // Do an addition request, checking for success or error
                            .add(negotiation);

                            // Rollback a transaction, which will redirect an error on request.
                            // Abort method needs to be executed through a transaction instance.
                            // transaction.abort();

                            // An aborted transaction can be treated through onabort event
                            // transaction.onabort = e => {
                            //     console.log(e);
                            //     console.log('Transação abortada');
                            // };

                            request.onsuccess = function (e) {
                                // console.log('Negociação incluída com sucesso!');
                                resolve();
                            };
                            request.onerror = function (e) {
                                console.error(e.target.error);
                                reject('Não foi possível incluir a negociação!');
                            };
                        });
                    }
                }, {
                    key: 'listAll',
                    value: function listAll() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {

                            var negotiations = [];

                            var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

                            cursor.onsuccess = function (e) {
                                // Actual pointer
                                var pointer = e.target.result;

                                if (pointer) {
                                    var data = pointer.value;
                                    negotiations.push(new Negotiation(data._date, data._quantity, data._value));
                                    pointer.continue();
                                } else resolve(negotiations);
                            };
                            cursor.onerror = function (e) {
                                console.error(e.target.error);
                                reject('Não foi possível listar as negociações!');
                            };
                        });
                    }
                }, {
                    key: 'deleteAll',
                    value: function deleteAll() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                            request.onsuccess = function (e) {
                                return resolve('Negociações removidas com sucesso!');
                            };
                            request.onerror = function (e) {
                                console.error(e.target.error);
                                reject('Não foi possível remover as negociações!');
                            };
                        });
                    }
                }]);

                return NegotiationDAO;
            }());

            _export('NegotiationDAO', NegotiationDAO);
        }
    };
});
//# sourceMappingURL=NegotiationDAO.js.map