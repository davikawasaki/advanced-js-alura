export class Message {

    // Default for empty params: ''
    // constructor(text='') {
    constructor(text) {
        this._text = text || '';
    }

    get text() {
        return this._text;
    }

    set text(text) {
        this._text = text;
    }
}