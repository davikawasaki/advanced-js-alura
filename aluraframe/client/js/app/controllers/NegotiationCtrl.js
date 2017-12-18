class NegotiationCtrl {

    constructor() {
        // Maintain binding association with document to dollar sign
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#data');
        this._inputQuantity = $('#quantidade');
        this._inputValue = $('#valor');

        // OBSERVER PATTERN
        // @see: https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
        // Instance of negotiationList passing negotiationView update as anonymous fn
        // Case 1. Passes this context as params (needs reflection)
        // this._negotiationList = new NegotiationList(this, function(model) {
        // Case 2. Passing just model as params (arrow function context is lexical, not dynamic)
        this._negotiationList = new NegotiationList(model => 
            this._negotiationView.update(model)
        );

        this._negotiationView = new NegotiationView($('#negotiationView'));
        this._negotiationView.update(this._negotiationList);

        this._message = new Message();
        this._messageView = new MessageView($('#messageView'));
        this._messageView.update(this._message);
    }

    add(event) {
        event.preventDefault();

        // Add negotiation to list
        this._negotiationList.add(this._createNegotiation());

        this._message.text = 'Negociação adicionada com sucesso!';
        this._messageView.update(this._message);

        this._clearForm();
    }

    empty() {
        this._negotiationList.empty();

        this._message.text = 'Lista de Negociações apagadas com sucesso!';
        this._messageView.update(this._message);
    }

    _createNegotiation() {
        return new Negotiation(
            DateHelper.txt2date(this._inputDate.value),
            this._inputQuantity.value,
            this._inputValue.value
        );
    }

    _clearForm() {
        this._inputDate.value = "";
        this._inputQuantity.value = 1;
        this._inputValue.value = 0.0;

        this._inputDate.focus();
    }
}