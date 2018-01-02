import {Negotiation} from '../models/Negotiation';

// Data Access Object: API persistence layer for IndexedDB
export class NegotiationDAO {

    constructor(connection) {
        this._connection = connection;
        this._store = 'negotiations';
    }

    add(negotiation) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                // First, get transaction to an object store
                .transaction([this._store], 'readwrite')
                // Second, get access to a transactional store through a transaction
                .objectStore(this._store)
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

            request.onsuccess = e => {
                // console.log('Negociação incluída com sucesso!');
                resolve();
            };
            request.onerror = e => {
                console.error(e.target.error);
                reject('Não foi possível incluir a negociação!');
            };
        });
    }

    listAll() {
        return new Promise((resolve, reject) => {
            
            let negotiations = [];
            
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();
            
            cursor.onsuccess = e => {
                // Actual pointer
                let pointer = e.target.result;

                if(pointer) {
                    let data = pointer.value;
                    negotiations.push(new Negotiation(data._date, data._quantity, data._value));
                    pointer.continue();
                } else resolve(negotiations);
            };
            cursor.onerror = e => {
                console.error(e.target.error);
                reject('Não foi possível listar as negociações!');
            };
        });
    }

    deleteAll() {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Negociações removidas com sucesso!');
            request.onerror = e => {
                console.error(e.target.error);
                reject('Não foi possível remover as negociações!');
            };
        })
    }

}