export class NegotiationList {
    constructor(viewFn) {
        this._negotiations = [];
        this._viewFn = viewFn;
        // this._context = context;
    }

    add(negotiation) {
        this._negotiations.push(negotiation);
        // Call anonymous fn to update view with negotiationList from this
        // Does not work with dynamic context, since the context NegotiationList
        // is different from NegotiationCtrl
        this._viewFn(this);

        // Calling static method of Reflect, passing method to be called,
        // its respective context and the received params
        // Reflect.apply(this._viewFn, this._context, [this]);

        // Calling static method with apply (ES5). Alternative before reflect in ES6.
        // this._viewFn.apply(this._context, [this]);
    }

    get negotiations() {
        // Blinding array list returning a copied version of negotiations list
        return [].concat(this._negotiations);
    }

    empty() {
        this._negotiations = [];
        this._viewFn(this);

        // Reflect.apply(this._viewFn, this._context, [this]);

        // this._viewFn.apply(this._context, [this]);
    }
}