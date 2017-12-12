class NegotiationList {
    constructor() {
        this._negotiations = [];
    }

    add(negotiation) {
        this._negotiations.push(negotiation);
    }

    get negotiations() {
        // Blinding array list returning a copied version of negotiations list
        return [].concat(this._negotiations);
    }
}