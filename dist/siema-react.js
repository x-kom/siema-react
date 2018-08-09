'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var ReactDOM = _interopRequireWildcard(_reactDom);

var _siema = require('siema');

var _siema2 = _interopRequireDefault(_siema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SiemaWrapper = function (_React$Component) {
    _inherits(SiemaWrapper, _React$Component);

    function SiemaWrapper() {
        _classCallCheck(this, SiemaWrapper);

        return _possibleConstructorReturn(this, (SiemaWrapper.__proto__ || Object.getPrototypeOf(SiemaWrapper)).apply(this, arguments));
    }

    _createClass(SiemaWrapper, [{
        key: 'shouldComponentUpdate',

        // since all further children updates will be handled in "componentWillReceiveProps" of the main Siema component
        // we render this wrapper only once at the beginning for the slides to be visible in SSR output and for proper `hydrate` after that
        value: function shouldComponentUpdate() {
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement("div", { ref: this.props.innerRef, className: this.props.className }, this.props.children);
        }
    }]);

    return SiemaWrapper;
}(React.Component);

var Siema = function (_React$Component2) {
    _inherits(Siema, _React$Component2);

    function Siema(props) {
        _classCallCheck(this, Siema);

        var _this2 = _possibleConstructorReturn(this, (Siema.__proto__ || Object.getPrototypeOf(Siema)).call(this, props));

        _this2.portals = [];
        _this2.prev = function () {
            var _this2$siemaInstance;

            (_this2$siemaInstance = _this2.siemaInstance).prev.apply(_this2$siemaInstance, arguments);
        };
        _this2.next = function () {
            var _this2$siemaInstance2;

            (_this2$siemaInstance2 = _this2.siemaInstance).next.apply(_this2$siemaInstance2, arguments);
        };
        _this2.goTo = function () {
            var _this2$siemaInstance3;

            (_this2$siemaInstance3 = _this2.siemaInstance).goTo.apply(_this2$siemaInstance3, arguments);
        }; // TODO: improve types
        _this2.getSiemaWrapperRef = function (element) {
            _this2.siemaWrapper = element;
        };
        _this2.addClickEventForClickable = function (children, clickable) {
            if (clickable) {
                _this2.options.preventClickOnDrag = true;
                return React.Children.map(children, function (child, index) {
                    var childNode = void 0;
                    childNode = typeof child === 'string' || typeof child === 'number' || typeof child.type === 'undefined' ? React.createElement("div", null, child) : child;
                    return React.cloneElement(childNode, {
                        onClick: function onClick(e) {
                            if (typeof childNode.props.onClick === 'function') {
                                childNode.props.onClick(e);
                            }
                            _this2.goTo(index);
                        }
                    });
                });
            } else {
                return children;
            }
        };
        _this2.wrapSlide = function (slide, key) {
            return React.createElement("div", { key: key }, slide);
        };
        _this2.renderIntoPortal = function (slide, i) {
            return ReactDOM.createPortal(slide, _this2.portals[i]);
        };
        var _this2$props = _this2.props,
            _this2$props$duration = _this2$props.duration,
            duration = _this2$props$duration === undefined ? 200 : _this2$props$duration,
            _this2$props$easing = _this2$props.easing,
            easing = _this2$props$easing === undefined ? 'ease-out' : _this2$props$easing,
            _this2$props$perPage = _this2$props.perPage,
            perPage = _this2$props$perPage === undefined ? 1 : _this2$props$perPage,
            _this2$props$slideWid = _this2$props.slideWidth,
            slideWidth = _this2$props$slideWid === undefined ? 0 : _this2$props$slideWid,
            _this2$props$mode = _this2$props.mode,
            mode = _this2$props$mode === undefined ? 'left' : _this2$props$mode,
            _this2$props$freeDrag = _this2$props.freeDrag,
            freeDrag = _this2$props$freeDrag === undefined ? false : _this2$props$freeDrag,
            _this2$props$startInd = _this2$props.startIndex,
            startIndex = _this2$props$startInd === undefined ? 0 : _this2$props$startInd,
            _this2$props$draggabl = _this2$props.draggable,
            draggable = _this2$props$draggabl === undefined ? true : _this2$props$draggabl,
            _this2$props$multiple = _this2$props.multipleDrag,
            multipleDrag = _this2$props$multiple === undefined ? true : _this2$props$multiple,
            _this2$props$threshol = _this2$props.threshold,
            threshold = _this2$props$threshol === undefined ? 20 : _this2$props$threshol,
            _this2$props$loop = _this2$props.loop,
            loop = _this2$props$loop === undefined ? false : _this2$props$loop,
            _this2$props$overflow = _this2$props.overflowHidden,
            overflowHidden = _this2$props$overflow === undefined ? true : _this2$props$overflow,
            _this2$props$preventC = _this2$props.preventClickOnDrag,
            preventClickOnDrag = _this2$props$preventC === undefined ? true : _this2$props$preventC,
            _this2$props$onInit = _this2$props.onInit,
            onInit = _this2$props$onInit === undefined ? function () {
            return undefined;
        } : _this2$props$onInit,
            _this2$props$onChange = _this2$props.onChange,
            onChange = _this2$props$onChange === undefined ? function () {
            return undefined;
        } : _this2$props$onChange,
            _this2$props$onDrag = _this2$props.onDrag,
            onDrag = _this2$props$onDrag === undefined ? function () {
            return undefined;
        } : _this2$props$onDrag,
            _this2$props$clickabl = _this2$props.clickable,
            clickable = _this2$props$clickabl === undefined ? false : _this2$props$clickabl;

        _this2.options = {
            selector: null,
            duration: duration,
            easing: easing,
            perPage: perPage,
            slideWidth: slideWidth,
            mode: mode,
            freeDrag: freeDrag,
            startIndex: startIndex,
            draggable: draggable,
            multipleDrag: multipleDrag,
            threshold: threshold,
            preventClickOnDrag: preventClickOnDrag,
            loop: loop,
            overflowHidden: overflowHidden,
            onInit: onInit,
            onChange: onChange,
            onDrag: onDrag
        };
        _this2.slides = _this2.addClickEventForClickable(_this2.props.children, clickable);
        return _this2;
    }

    _createClass(Siema, [{
        key: 'updatePortals',
        value: function updatePortals() {
            if (this.siemaInstance) {
                // updating slides
                var oldSlidesNumber = this.siemaWrapper.children[0].children.length;
                var newSlidesNumber = this.slides.length;
                if (newSlidesNumber > oldSlidesNumber) {
                    for (var i = oldSlidesNumber; i < newSlidesNumber; ++i) {
                        this.siemaInstance.append(document.createElement('div'));
                    }
                } else if (newSlidesNumber < oldSlidesNumber) {
                    for (var _i = oldSlidesNumber - 1; _i >= newSlidesNumber; --_i) {
                        this.siemaInstance.remove(_i);
                    }
                }
                for (var _i2 = 0; _i2 < this.slides.length; ++_i2) {
                    if (!this.portals[_i2]) {
                        var slideWrapper = this.siemaWrapper.children[0].children[_i2].children[0];
                        if (slideWrapper.children.length > 0) {
                            slideWrapper.removeChild(slideWrapper.children[0]);
                        }
                    }
                    this.portals[_i2] = this.siemaWrapper.children[0].children[_i2].children[0];
                }
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.slides = this.addClickEventForClickable(nextProps.children, nextProps.clickable);
            this.updatePortals();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.options.selector = this.siemaWrapper;
            this.siemaInstance = new _siema2.default(this.options);
            this.updatePortals();
            this.forceUpdate();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(React.Fragment, null, React.createElement(SiemaWrapper, { innerRef: this.getSiemaWrapperRef, className: this.props.className }, this.slides.map(this.wrapSlide)), this.slides.length > 0 && this.portals.length > 0 && this.slides.map(this.renderIntoPortal));
        }
    }]);

    return Siema;
}(React.Component);

exports.default = Siema;
//# sourceMappingURL=siema-react.js.map