export class Negotiation {

    constructor(date, quantity, value) {
        // Private properties
        this._date = new Date(date.getTime());
        this._quantity = quantity;
        this._value = value;
        // Make object imutable
        Object.freeze(this);
    }

    get date() {
        return new Date(this._date.getTime()); // Returning a copy of this._date object
    }

    get quantity() {
        return this._quantity;
    }

    get value() {
        return this._value;
    }

    get volume() {
        return this._quantity * this._value;
    }

    isEqual(other) {
        return JSON.stringify(this) == JSON.stringify(other);
    }

}