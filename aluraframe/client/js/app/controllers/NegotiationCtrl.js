class NegotiationCtrl {

    constructor() {
        // Maintain binding association with document to dollar sign
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#data');
        this._inputQuantity = $('#quantidade');
        this._inputValue = $('#valor');
        this._negotiationList = new NegotiationList();
        this._negotiationView = new NegotiationView($('#negotiationView'));

        this._negotiationView.update(this._negotiationList);
    }

    add(event) {
        event.preventDefault();

        // Add negotiation to list
        this._negotiationList.add(this._createNegotiation());
        this._negotiationView.update(this._negotiationList);
        this._clearForm();
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