import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegotiationDAO} from '../dao/NegotiationDAO';
import {Negotiation} from '../models/Negotiation';

export class NegotiationService {

    constructor() {
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
    getWeeklyNegotiations() {
        return this._http
            .get('negociacoes/semana')
            .then(negotiations => {
                return negotiations
                    .map(obj => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor));
            })
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível obter as negociações da semana!');
            });
    }

    getLastWeekNegotiations() {
        return this._http
            .get('negociacoes/anterior')
            .then(negotiations => {
                return negotiations
                    .map(obj => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor));
            })
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível obter as negociações da semana anterior!');
            });
    }

    getLastTwoWeekNegotiations() {
        return this._http
            .get('negociacoes/retrasada')
            .then(negotiations => {
                return negotiations
                    .map(obj => new Negotiation(new Date(obj.data), obj.quantidade, obj.valor));
            })
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível obter as negociações da semana retrasada!');
            });
    }

    getAllNegotiations() {
        return Promise.all([
            this.getWeeklyNegotiations(),
            this.getLastWeekNegotiations(),
            this.getLastTwoWeekNegotiations()
        ]).then(periods => {
            let negotiations = periods
                .reduce((data, period) => data.concat(period), []);
            return negotiations;
        }).catch(err => {
            throw new Error(err);
        });
    }

    add(negotiation) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegotiationDAO(connection))
            .then(negotiationDAO => negotiationDAO.add(negotiation))
            .then(() => 'Negociação adicionada com sucesso!')
            .catch(() => {
                throw new Error('Não foi possível adicionar a negociação!')
            });

        // Since promise pattern has a catch, try/catch is not needed anymore
        // try {
        // } catch(err) {
        //     this._message.text = err;
        // }
    }

    empty() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegotiationDAO(connection))
            .then(negotiationDAO => negotiationDAO.deleteAll())
            .then(() => 'Negociações apagadas com sucesso!')
            .catch(err => {
                console.error(err);
                throw new Error('Não foi possível apagar as negociações!');
            })
    }

    import(actualList) {
        // PROMISE PATTERN WITH ALL NEGOTIATIONS ENCAPSULATED
        return this.getAllNegotiations()
            // Check if each negotiation was already imported, filtering those who are already there
            .then(negotiations => 
                negotiations.filter(negotiation => 
                    !actualList.some(negotiationFromList => 
                        negotiation.isEqual(negotiationFromList)))
            )
            .catch(err => {
                console.error(err);
                throw new Error('Não foi possível buscar negociações para importar!');
            })
    }

}