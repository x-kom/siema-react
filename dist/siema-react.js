'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _siema = require('siema');

var _siema2 = _interopRequireDefault(_siema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Siema = function (_React$Component) {
    _inherits(Siema, _React$Component);

    function Siema(props) {
        _classCallCheck(this, Siema);

        var _this = _possibleConstructorReturn(this, (Siema.__proto__ || Object.getPrototypeOf(Siema)).call(this, props));

        _this.prev = function () {
            var _this$siemaInstance;

            (_this$siemaInstance = _this.siemaInstance).prev.apply(_this$siemaInstance, arguments);
        };
        _this.next = function () {
            var _this$siemaInstance2;

            (_this$siemaInstance2 = _this.siemaInstance).next.apply(_this$siemaInstance2, arguments);
        };
        _this.goTo = function () {
            var _this$siemaInstance3;

            (_this$siemaInstance3 = _this.siemaInstance).goTo.apply(_this$siemaInstance3, arguments);
        };
        _this.getSiemaWrapperRef = function (element) {
            _this.siemaWrapper = element;
        };
        _this.addClickEventForClickable = function (children, clickable) {
            if (clickable) {
                _this.options.preventClickOnDrag = true;
                return React.Children.map(children, function (child, index) {
                    var childNode = void 0;
                    childNode = typeof child === 'string' || typeof child === 'number' || typeof child.type === 'undefined' ? React.createElement("div", null, child) : child;
                    return React.cloneElement(childNode, {
                        onClick: function onClick(e) {
                            if (typeof childNode.props.onClick === 'function') {
                                childNode.props.onClick(e);
                            }
                            _this.goTo(index);
                        }
                    });
                });
            } else {
                return children;
            }
        };

        var _this$props = _this.props,
            _this$props$duration = _this$props.duration,
            duration = _this$props$duration === undefined ? 200 : _this$props$duration,
            _this$props$easing = _this$props.easing,
            easing = _this$props$easing === undefined ? 'ease-out' : _this$props$easing,
            _this$props$perPage = _this$props.perPage,
            perPage = _this$props$perPage === undefined ? 1 : _this$props$perPage,
            _this$props$startInde = _this$props.startIndex,
            startIndex = _this$props$startInde === undefined ? 0 : _this$props$startInde,
            _this$props$draggable = _this$props.draggable,
            draggable = _this$props$draggable === undefined ? true : _this$props$draggable,
            _this$props$multipleD = _this$props.multipleDrag,
            multipleDrag = _this$props$multipleD === undefined ? true : _this$props$multipleD,
            _this$props$threshold = _this$props.threshold,
            threshold = _this$props$threshold === undefined ? 20 : _this$props$threshold,
            _this$props$loop = _this$props.loop,
            loop = _this$props$loop === undefined ? false : _this$props$loop,
            _this$props$overflowH = _this$props.overflowHidden,
            overflowHidden = _this$props$overflowH === undefined ? true : _this$props$overflowH,
            _this$props$preventCl = _this$props.preventClickOnDrag,
            preventClickOnDrag = _this$props$preventCl === undefined ? false : _this$props$preventCl,
            _this$props$onInit = _this$props.onInit,
            onInit = _this$props$onInit === undefined ? function () {
            return undefined;
        } : _this$props$onInit,
            _this$props$onChange = _this$props.onChange,
            _onChange = _this$props$onChange === undefined ? function () {
            return undefined;
        } : _this$props$onChange,
            _this$props$clickable = _this$props.clickable,
            clickable = _this$props$clickable === undefined ? false : _this$props$clickable;

        _this.options = {
            selector: null,
            duration: duration,
            easing: easing,
            perPage: perPage,
            startIndex: startIndex,
            draggable: draggable,
            multipleDrag: multipleDrag,
            threshold: threshold,
            preventClickOnDrag: preventClickOnDrag,
            loop: loop,
            overflowHidden: overflowHidden,
            onInit: onInit,
            onChange: function onChange() {
                return _onChange(_this.siemaInstance.currentSlide);
            }
        };
        _this.slides = _this.addClickEventForClickable(_this.props.children, clickable);
        return _this;
    }

    _createClass(Siema, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.slides = this.addClickEventForClickable(nextProps.children, nextProps.clickable);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.options.selector = this.siemaWrapper;
            this.siemaInstance = new _siema2.default(this.options);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement("div", { ref: this.getSiemaWrapperRef, className: this.props.className }, this.slides);
        }
    }]);

    return Siema;
}(React.Component);

exports.default = Siema;
//# sourceMappingURL=siema-react.js.map