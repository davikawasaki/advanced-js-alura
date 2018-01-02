'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegotiationService = function () {
    function NegotiationService() {
        _classCallCheck(this, NegotiationService);

        this._http = new HttpService();
    }

    // CALLBACK PATTERN FOR ASYNC REQUESTS
    // @see: http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/
    // getWeeklyNegotiations(cb) {
    //     let xhr = new XMLHttpRequest();
    //     xhr.open('GET', 'negociacoes/semana');
    //     xhr.onreadystatechange = () => {
    //         if(xhr.readyState == 4) {
    //             if(xhr.status == 200) {
    //                 console.log('Getting negotiations from server');
    //                 cb(null, JSON.parse(xhr.responseText)
    //                     .map(obj => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor)));
    //             } else {
    //                 console.log(xhr.responseText);
    //                 cb('Não foi possível obter as negociações da semana!');
    //             }
    //         }
    //     }
    //     xhr.send();
    // }

    // PROMISE PATTERN FOR ASYNC REQUESTS WITH HTTP SERVICE
    // @see: https://developers.google.com/web/fundamentals/primers/promises


    _createClass(NegotiationService, [{
        key: 'getWeeklyNegotiations',
        value: function getWeeklyNegotiations() {
            return this._http.get('negociacoes/semana').then(function (negotiations) {
                return negotiations.map(function (obj) {
                    return new Negotiation(new Date(obj.data), obj.quantidade, obj.valor);
                });
            }).catch(function (err) {
                console.log(err);
                throw new Error('Não foi possível obter as negociações da semana!');
            });
        }
    }, {
        key: 'getLastWeekNegotiations',
        value: function getLastWeekNegotiations() {
            return this._http.get('negociacoes/anterior').then(function (negotiations) {
                return negotiations.map(function (obj) {
                    return new Negotiation(new Date(obj.data), obj.quantidade, obj.valor);
                });
            }).catch(function (err) {
                console.log(err);
                throw new Error('Não foi possível obter as negociações da semana anterior!');
            });
        }
    }, {
        key: 'getLastTwoWeekNegotiations',
        value: function getLastTwoWeekNegotiations() {
            return this._http.get('negociacoes/retrasada').then(function (negotiations) {
                return negotiations.map(function (obj) {
                    return new Negotiation(new Date(obj.data), obj.quantidade, obj.valor);
                });
            }).catch(function (err) {
                console.log(err);
                throw new Error('Não foi possível obter as negociações da semana retrasada!');
            });
        }
    }, {
        key: 'getAllNegotiations',
        value: function getAllNegotiations() {
            return Promise.all([this.getWeeklyNegotiations(), this.getLastWeekNegotiations(), this.getLastTwoWeekNegotiations()]).then(function (periods) {
                var negotiations = periods.reduce(function (data, period) {
                    return data.concat(period);
                }, []);
                return negotiations;
            }).catch(function (err) {
                throw new Error(err);
            });
        }
    }, {
        key: 'add',
        value: function add(negotiation) {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegotiationDAO(connection);
            }).then(function (negotiationDAO) {
                return negotiationDAO.add(negotiation);
            }).then(function () {
                return 'Negociação adicionada com sucesso!';
            }).catch(function () {
                throw new Error('Não foi possível adicionar a negociação!');
            });

            // Since promise pattern has a catch, try/catch is not needed anymore
            // try {
            // } catch(err) {
            //     this._message.text = err;
            // }
        }
    }, {
        key: 'empty',
        value: function empty() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegotiationDAO(connection);
            }).then(function (negotiationDAO) {
                return negotiationDAO.deleteAll();
            }).then(function () {
                return 'Negociações apagadas com sucesso!';
            }).catch(function (err) {
                console.error(err);
                throw new Error('Não foi possível apagar as negociações!');
            });
        }
    }, {
        key: 'import',
        value: function _import(actualList) {
            // PROMISE PATTERN WITH ALL NEGOTIATIONS ENCAPSULATED
            return this.getAllNegotiations()
            // Check if each negotiation was already imported, filtering those who are already there
            .then(function (negotiations) {
                return negotiations.filter(function (negotiation) {
                    return !actualList.some(function (negotiationFromList) {
                        return negotiation.isEqual(negotiationFromList);
                    });
                });
            }).catch(function (err) {
                console.error(err);
                throw new Error('Não foi possível buscar negociações para importar!');
            });
        }
    }]);

    return NegotiationService;
}();
//# sourceMappingURL=NegotiationService.js.map