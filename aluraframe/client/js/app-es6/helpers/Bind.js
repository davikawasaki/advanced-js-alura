import {ProxyFactory} from '../services/ProxyFactory';

export class Bind {

    // REST operator for multiples params as an array string
    // @see: https://www.smashingmagazine.com/2016/07/how-to-use-arguments-and-parameters-in-ecmascript-6/#rest-parameters
    // The rest parameter has the same syntax as the spread operator,
    // but instead of expanding an array into parameters,
    // it collects parameters and turns them into an array.
    constructor(model, view, ...props) {
        let proxy = ProxyFactory.create(model, props, model => view.update(model));
        // Initial model update
        view.update(model);
        return proxy;
    }

}