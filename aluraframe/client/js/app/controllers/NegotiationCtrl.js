class NegotiationCtrl {

    constructor() {
        // Maintain binding association with document to dollar sign
        let $ = document.querySelector.bind(document);
        this._inputDate = $('#data');
        this._inputQuantity = $('#quantidade');
        this._inputValue = $('#valor');
    }

    add(event) {
        event.preventDefault();

        // Version with spread operator
        let date = new Date(...this._inputDate.value
            .split('-')
            .map((item, index) => index == 1 ? item-1 : item)
            // Alternative with module, which declares 1 for index equal to 1
            // return item - index % 2
        );

        // Simpler version with split
        // let dateConverted = new Date(this._inputDate.value.split('-'));

        // Date converts the given array to string with commas delimeters
        // let dateConverted = new Date(this._inputDate.value.split('-').join(','));

        // Date converted with regex, changing every hyphen to comma
        // let dateConverted = new Date(this._inputDate.value.replace(/-/g, ','));

        let negotiation = new Negotiation(
            date,
            this._inputQuantity.value,
            this._inputValue.value
        );

        console.log(negotiation);

        // Add negotiation to list
    }
}