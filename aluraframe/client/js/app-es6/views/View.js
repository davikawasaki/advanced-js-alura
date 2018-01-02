export class View {

    constructor(el) {
        this._el = el;
    }

    template() {
        throw new Error('Template method must be implemented!');
    }

    update(model) {
        this._el.innerHTML = this.template(model);
    }
}