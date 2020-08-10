"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_dom_1 = tslib_1.__importDefault(require("react-dom"));
var siema_1 = tslib_1.__importDefault(require("siema"));
var memoize_one_1 = tslib_1.__importDefault(require("memoize-one"));
var SiemaWrapper = /** @class */function (_super) {
    tslib_1.__extends(SiemaWrapper, _super);
    function SiemaWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // since all further children updates will be handled in "componentWillReceiveProps" of the main Siema component
    // we render this wrapper only once at the beginning for the slides to be visible in SSR output and for proper `hydrate` after that
    SiemaWrapper.prototype.shouldComponentUpdate = function (nextProps) {
        if (nextProps.className !== this.props.className) {
            return true;
        }
        return false;
    };
    SiemaWrapper.prototype.render = function () {
        return react_1.default.createElement("div", { ref: this.props.innerRef, className: this.props.className }, this.props.children);
    };
    return SiemaWrapper;
}(react_1.default.Component);
var Siema = /** @class */function (_super) {
    tslib_1.__extends(Siema, _super);
    function Siema(props) {
        var _this = _super.call(this, props) || this;
        _this.portals = [];
        _this.prev = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            (_a = _this.siemaInstance).prev.apply(_a, args);
        };
        _this.next = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            (_a = _this.siemaInstance).next.apply(_a, args);
        };
        _this.goTo = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            (_a = _this.siemaInstance).goTo.apply(_a, args);
        }; // TODO: improve types
        _this.recalculateSizes = function () {
            _this.siemaInstance.resizeHandler();
        }; // TODO: also improve types
        _this.getSiemaWrapperRef = function (element) {
            _this.siemaWrapper = element;
        };
        _this.addClickEventForClickable = memoize_one_1.default(function (children, clickable) {
            if (clickable) {
                _this.options.preventClickOnDrag = true;
                return react_1.default.Children.map(children, function (child, index) {
                    var childNode;
                    childNode = typeof child === 'string' || typeof child === 'number' || typeof child.type === 'undefined' ? react_1.default.createElement("div", null, child) : child;
                    return react_1.default.cloneElement(childNode, {
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
        });
        _this.wrapSlide = function (slide, key) {
            return react_1.default.createElement("div", { key: key }, slide);
        };
        _this.renderIntoPortal = function (slide, i) {
            return react_dom_1.default.createPortal(slide, _this.portals[i]);
        };
        var _a = _this.props,

        // options
        _b = _a.duration,

        // options
        duration = _b === void 0 ? 200 : _b,
            _c = _a.easing,
            easing = _c === void 0 ? 'ease-out' : _c,
            _d = _a.perPage,
            perPage = _d === void 0 ? 1 : _d,
            _e = _a.slideWidth,
            slideWidth = _e === void 0 ? 0 : _e,
            _f = _a.mode,
            mode = _f === void 0 ? 'left' : _f,
            _g = _a.freeDrag,
            freeDrag = _g === void 0 ? false : _g,
            _h = _a.startIndex,
            startIndex = _h === void 0 ? 0 : _h,
            _j = _a.draggable,
            draggable = _j === void 0 ? true : _j,
            _k = _a.multipleDrag,
            multipleDrag = _k === void 0 ? true : _k,
            _l = _a.threshold,
            threshold = _l === void 0 ? 20 : _l,
            _m = _a.loop,
            loop = _m === void 0 ? false : _m,
            _o = _a.overflowHidden,
            overflowHidden = _o === void 0 ? true : _o,
            _p = _a.preventClickOnDrag,
            preventClickOnDrag = _p === void 0 ? true : _p,
            _q = _a.onInit,
            onInit = _q === void 0 ? function () {
            return undefined;
        } : _q,
            _r = _a.onChange,
            onChange = _r === void 0 ? function () {
            return undefined;
        } : _r,
            _s = _a.onDrag,
            onDrag = _s === void 0 ? function () {
            return undefined;
        } : _s;
        _this.options = {
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
        return _this;
    }
    Siema.prototype.updatePortals = function () {
        if (this.siemaInstance) {
            // updating slides
            var oldPortalsNumber = this.portals.length;
            var oldSlidesNumber = this.siemaWrapper.children[0].children.length;
            var newSlidesNumber = this.slides.length;
            if (newSlidesNumber > oldSlidesNumber) {
                for (var i = oldSlidesNumber; i < newSlidesNumber; ++i) {
                    this.siemaInstance.append(document.createElement('div'));
                }
            } else if (newSlidesNumber < oldSlidesNumber) {
                for (var i = oldSlidesNumber - 1; i >= newSlidesNumber; --i) {
                    this.siemaInstance.remove(i);
                }
            }
            for (var i = 0; i < newSlidesNumber; ++i) {
                if (!this.portals[i]) {
                    var slideWrapper = this.siemaWrapper.children[0].children[i].children[0];
                    if (slideWrapper.children.length > 0) {
                        slideWrapper.removeChild(slideWrapper.children[0]);
                    }
                }
                this.portals[i] = this.siemaWrapper.children[0].children[i].children[0];
            }
            for (var i = newSlidesNumber; i < oldPortalsNumber; ++i) {
                this.portals.pop();
            }
            if (oldPortalsNumber !== this.portals.length) {
                this.forceUpdate();
            }
        }
    };
    Siema.prototype.componentDidMount = function () {
        this.options.selector = this.siemaWrapper;
        this.siemaInstance = new siema_1.default(this.options);
        this.updatePortals(); // will cause rerender
    };
    Siema.prototype.componentDidUpdate = function () {
        this.updatePortals(); // may cause rerender
    };
    Siema.prototype.componentWillUnmount = function () {
        this.siemaInstance.destroy(false);
    };
    Siema.prototype.render = function () {
        this.slides = this.addClickEventForClickable(this.props.children, this.props.clickable);
        return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(SiemaWrapper, { innerRef: this.getSiemaWrapperRef, className: this.props.className }, this.slides.map(this.wrapSlide)), this.slides.length > 0 && this.portals.length > 0 && this.slides.slice(0, this.portals.length).map(this.renderIntoPortal));
    };
    return Siema;
}(react_1.default.PureComponent);
exports.default = Siema;
//# sourceMappingURL=siema-react.js.map