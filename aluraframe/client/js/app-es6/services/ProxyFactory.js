class ProxyFactory {

    static create(obj, props, action) {
        return new Proxy(obj, {
            get(target, prop, receiver) {
                // Alternative: intercepting methods
                if(props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    // Changing object function on proxy with a new function, letting the original one intact
                    // Scope needs to be dynamic
                    return function() {
                        console.log(`Intercepting method ${prop}`);
                        // Calling the original object method from target with arguments passed within his own scope
                        // Arguments is a implicit variable with access to method args when the method is called
                        let valueReturn = Reflect.apply(target[prop], target, arguments);

                        // Update view with controller scope and model, which is target
                        // JS method execution order: first get method reference, then apply it with params
                        action(target);

                        return valueReturn;
                    }
                }

                // Return property value of target
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {

                let proxyReturn = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) {
                    // Set new value for prop before updating view
                    // target[prop] = value;
                    action(target);
                }
                return proxyReturn;
            }
        });
    }

    static _isFunction(fn) {
        return typeof(fn) == typeof(Function);
    }

}