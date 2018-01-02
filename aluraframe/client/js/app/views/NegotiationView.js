'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NegotiationView = function (_View) {
    _inherits(NegotiationView, _View);

    function NegotiationView(el) {
        _classCallCheck(this, NegotiationView);

        return _possibleConstructorReturn(this, (NegotiationView.__proto__ || Object.getPrototypeOf(NegotiationView)).call(this, el));
    }

    _createClass(NegotiationView, [{
        key: 'template',
        value: function template(model) {
            return '\n        <table class="table table-hover table-bordered">\n            <thead>\n                <tr>\n                    <th onclick="negotiationCtrl.order(\'date\')">DATA</th>\n                    <th onclick="negotiationCtrl.order(\'quantity\')">QUANTIDADE</th>\n                    <th onclick="negotiationCtrl.order(\'value\')">VALOR</th>\n                    <th onclick="negotiationCtrl.order(\'volume\')">VOLUME</th>\n                </tr>\n            </thead>\n            \n            <tbody>\n                <!-- Iterate negotiations and return concatenated string of td -->\n                ' + model.negotiations.map(function (n) {
                return '\n                    <tr>\n                        <td>' + DateHelper.date2txt(n.date) + '</td>\n                        <td>' + n.quantity + '</td>\n                        <td>' + n.value + '</td>\n                        <td>' + n.volume + '</td>\n                    </tr>\n                ';
            }).join('') + '\n            </tbody>\n            \n            <tfoot>\n                <td colspan="3"></td>\n                <td>' + model.totalVolume

            // Auto invokable function
            // IIFE: Immediate invoked function expression
            // @see: https://imasters.com.br/front-end/javascript/sobre-funcoes-imediatas-javascript-iife/?trace=1519021197&source=single
            //(function() {
            //    let total = 0;
            //    model.negotiations.forEach(n => total += n.volume );
            //    console.log(total)
            //    return total;
            //})()
            + '</td>\n            </tfoot>\n        </table>\n        ';
        }
    }]);

    return NegotiationView;
}(View);
//# sourceMappingURL=NegotiationView.js.map