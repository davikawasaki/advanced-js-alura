class NegotiationList {
    constructor() {
        this._negotiations = [];
    }

    add(negotiation) {
        this._negotiations.push(negotiation);

        // Alternative: this attribution event is catched by proxy
        // this._negotiations = [].concat(this._negotiations, negotiation);
    }

    get negotiations() {
        // Blinding array list returning a copied version of negotiations list
        return [].concat(this._negotiations);
    }

    empty() {
        this._negotiations = [];
    }

    get totalVolume() {
        return this._negotiations.reduce((total, n) => total + n.volume, 0.0);
    }
}