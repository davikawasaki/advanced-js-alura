'use strict';

System.register(['./controllers/NegotiationCtrl', './polyfill/fetch'], function (_export, _context) {
  "use strict";

  var currentInstance, negotiationCtrl;
  return {
    setters: [function (_controllersNegotiationCtrl) {
      currentInstance = _controllersNegotiationCtrl.currentInstance;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negotiationCtrl = currentInstance();


      document.querySelector('.form').onsubmit = negotiationCtrl.add.bind(negotiationCtrl);
      document.querySelector('[type=button]').onclick = negotiationCtrl.empty.bind(negotiationCtrl);
    }
  };
});
//# sourceMappingURL=boot.js.map