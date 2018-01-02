import {View} from './View';
import {DateHelper} from '../helpers/DateHelper';
import {currentInstance} from '../controllers/NegotiationCtrl';

export class NegotiationView extends View {

    constructor(el) {
        super(el);
        // Event delegation to parent elements, in order to execute properly methods from controller
        el.addEventListener('click', function(event) {
            if(event.target.nodeName == 'TH')
                currentInstance().order(event.target.textContent.toLowerCase());
        });
    }

    template(model) {
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
                    model.totalVolume

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

}