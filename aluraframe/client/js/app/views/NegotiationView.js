class NegotiationView {

    constructor(el) {
        this._el = el;
    }

    _template(model) {
        console.log(model)
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                <!-- Iterate negotiations and return concatenated string of td -->
                ${model.negotiations.map(n => `
                    <tr>
                        <td>${DateHelper.date2txt(n.date)}</td>
                        <td>${n.quantity}</td>
                        <td>${n.value}</td>
                        <td>${n.volume}</td>
                    </tr>
                `).join('')}
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>${
                    model.negotiations.reduce((total, n) => total + n.volume, 0.0)

                    // Auto invokable function
                    // IIFE: Immediate invoked function expression
                    // @see: https://imasters.com.br/front-end/javascript/sobre-funcoes-imediatas-javascript-iife/?trace=1519021197&source=single
                    //(function() {
                    //    let total = 0;
                    //    model.negotiations.forEach(n => total += n.volume );
                    //    console.log(total)
                    //    return total;
                    //})()
                }</td>
            </tfoot>
        </table>
        `;
    }

    update(model) {
        this._el.innerHTML = this._template(model);
    }
}