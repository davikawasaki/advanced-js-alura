// MODULE PATTERN WITH AUTO INVOKABLE FUNCTION
// @see: https://medium.com/@tkssharma/javascript-module-pattern-b4b5012ada9f
// var ConnectionFactory = (function() {

// ES2015 MODULE PATTERN
const stores = ['negotiations'];
const version = 1;
const dbName = 'aluraframe';

let connection = null;
let close = null;

// return class ConnectionFactory {
export class ConnectionFactory {

    // ConnectionFactory with only one accessible connection as a static method
    // 1. getConnection must be a static method
    // 2. getConnection must return a promise
    // 3. connection gotta be the same no matter how many times the static method is called
    // 4. connection can't be closed directly, which means it can only happens through connectionFactory

    constructor() {
        throw new Error('Não é possível criar instâncias de ConnectionFactory!');
    }

    static getConnection() {
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open(dbName, version);
            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
            };
            openRequest.onsuccess = e => {
                if(!connection) {
                    connection = e.target.result;
                    // Monkey-patching: changing API logic
                    // @see: http://me.dt.in.th/page/JavaScript-override/
                    close = connection.close.bind(connection);   
                    connection.close = function() {
                        throw new Error('Você não pode fechar diretamente a conexão!');
                    }
                }
                resolve(connection);
            };
            openRequest.onerror = e => {
                console.error(e.target.error);
                reject(e.target.error.name);
            };
        });
    }
    
    static _createStores(connection) {
        stores.forEach(store => {
            if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
            connection.createObjectStore(store, {autoIncrement: true});
        });
    }

    static closeConnection() {
        if(connection) {
            close();
            // Option without bind on monkey-patch
            // Reflect.apply(close, connection, []);
            connection = null;
        }
    }

}

// })();
