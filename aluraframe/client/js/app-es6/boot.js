import {currentInstance} from './controllers/NegotiationCtrl';
import {} from './polyfill/fetch';

let negotiationCtrl = currentInstance();

document.querySelector('.form').onsubmit = negotiationCtrl.add.bind(negotiationCtrl)
document.querySelector('[type=button]').onclick = negotiationCtrl.empty.bind(negotiationCtrl)