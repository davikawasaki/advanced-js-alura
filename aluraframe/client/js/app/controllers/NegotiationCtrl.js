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

        /* this._negotiationList = new NegotiationList(model => 
            this._negotiationView.update(model)
        ); */

        // PROXY PATTERN
        // @see: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Proxy
        // Encapsulates the real object to be manipulated. Acts like an interface between the real object and the rest of the code.
        // It's possible to attach codes beside ones from models, which needs to be executed in updates.
        /* let self = this;
        this._negotiationList = new Proxy(new NegotiationList(), {
            get(target, prop, receiver) {
                // Alternative: intercepting methods
                if(['add', 'empty'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
                    // Changing object function on proxy with a new function, letting the original one intact
                    // Scope needs to be dynamic
                    return function() {
                        console.log(`Intercepting method ${prop}`);
                        // Calling the original object method from target with arguments passed within his own scope
                        // Arguments is a implicit variable with access to method args when the method is called
                        Reflect.apply(target[prop], target, arguments);

                        // Update view with controller scope and model, which is target
                        // JS method execution order: first get method reference, then apply it with params
                        self._negotiationView.update(target);
                    }
                }

                // Return property value of target
                return Reflect.get(target, prop, receiver);
            }
        }); */

        // FACTORY PATTERN
        // @see: http://robdodson.me/javascript-design-patterns-factory/
        // Binding between model and view
        
        // Unidirectional data-binding
        // this._negotiationList = ProxyFactory.create(new NegotiationList,
        //     ['add', 'empty'],
        //     model => this._negotiationView.update(model));
        // this._negotiationView = new NegotiationView($('#negotiationView'));
        // this._negotiationView.update(this._negotiationList);
        
        // Data-binding with auto-update
        this._negotiationList = new Bind(new NegotiationList,
            new NegotiationView($('#negotiationView')),
            'add', 'empty');

        // Unidirectional data-binding
        // this._message = ProxyFactory.create(new Message(),
        //     ['text'],
        //     model => this._messageView.update(model));
        // this._messageView.update(this._message);
        // this._messageView = new MessageView($('#messageView'));

        // Data-binding with auto-update
        this._message = new Bind(new Message(),
        new MessageView($('#messageView')),
            'text');
    }

    add(event) {
        event.preventDefault();

        // Add negotiation to list
        this._negotiationList.add(this._createNegotiation());

        this._message.text = 'Negociação adicionada com sucesso!';

        // Commented with factory proxy pattern use
        // this._messageView.update(this._message);

        this._clearForm();
    }

    empty() {
        this._negotiationList.empty();

        this._message.text = 'Lista de Negociações apagadas com sucesso!';

        // Commented with factory proxy pattern use
        // this._messageView.update(this._message);
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