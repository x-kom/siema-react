import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SiemaBase from 'siema';
class SiemaWrapper extends React.Component {
    // since all further children updates will be handled in "componentWillReceiveProps" of the main Siema component
    // we render this wrapper only once at the beginning for the slides to be visible in SSR output and for proper `hydrate` after that
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (React.createElement("div", { ref: this.props.innerRef, className: this.props.className }, this.props.children));
    }
}
class Siema extends React.Component {
    constructor(props) {
        super(props);
        this.portals = [];
        this.prev = (...args) => { this.siemaInstance.prev(...args); };
        this.next = (...args) => { this.siemaInstance.next(...args); };
        this.goTo = (...args) => { this.siemaInstance.goTo(...args); }; // TODO: improve types
        this.getSiemaWrapperRef = (element) => { this.siemaWrapper = element; };
        this.addClickEventForClickable = (children, clickable) => {
            if (clickable) {
                this.options.preventClickOnDrag = true;
                return React.Children.map(children, (child, index) => {
                    let childNode;
                    childNode =
                        (typeof child === 'string' || typeof child === 'number' || typeof child.type === 'undefined')
                            ? React.createElement("div", null, child)
                            : child;
                    return React.cloneElement(childNode, {
                        onClick: (e) => {
                            if (typeof childNode.props.onClick === 'function') {
                                childNode.props.onClick(e);
                            }
                            this.goTo(index);
                        }
                    });
                });
            }
            else {
                return children;
            }
        };
        this.wrapSlide = (slide, key) => React.createElement("div", { key: key }, slide);
        this.renderIntoPortal = (slide, i) => ReactDOM.createPortal(slide, this.portals[i]);
        const { 
        // options
        duration = 200, easing = 'ease-out', perPage = 1, slideWidth = 0, mode = 'left', freeDrag = false, startIndex = 0, draggable = true, multipleDrag = true, threshold = 20, loop = false, overflowHidden = true, preventClickOnDrag = true, onInit = () => undefined, onChange = () => undefined, 
        // props
        clickable = false } = this.props;
        this.options = {
            selector: null,
            duration,
            easing,
            perPage,
            slideWidth,
            mode,
            freeDrag,
            startIndex,
            draggable,
            multipleDrag,
            threshold,
            preventClickOnDrag,
            loop,
            overflowHidden,
            onInit,
            onChange: () => onChange(this.siemaInstance.currentSlide),
        };
        this.slides = this.addClickEventForClickable(this.props.children, clickable);
    }
    updatePortals() {
        if (this.siemaInstance) {
            // updating slides
            const oldSlidesNumber = this.siemaWrapper.children[0].children.length;
            const newSlidesNumber = this.slides.length;
            if (newSlidesNumber > oldSlidesNumber) {
                for (let i = oldSlidesNumber; i < newSlidesNumber; ++i) {
                    this.siemaInstance.append(document.createElement('div'));
                }
            }
            else if (newSlidesNumber < oldSlidesNumber) {
                for (let i = oldSlidesNumber - 1; i >= newSlidesNumber; --i) {
                    this.siemaInstance.remove(i);
                }
            }
            for (let i = 0; i < this.slides.length; ++i) {
                if (!this.portals[i]) {
                    const slideWrapper = this.siemaWrapper.children[0].children[i].children[0];
                    if (slideWrapper.children.length > 0) {
                        slideWrapper.removeChild(slideWrapper.children[0]);
                    }
                }
                this.portals[i] = this.siemaWrapper.children[0].children[i].children[0];
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        this.slides = this.addClickEventForClickable(nextProps.children, nextProps.clickable);
        this.updatePortals();
    }
    componentDidMount() {
        this.options.selector = this.siemaWrapper;
        this.siemaInstance = new SiemaBase(this.options);
        this.updatePortals();
        this.forceUpdate();
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(SiemaWrapper, { innerRef: this.getSiemaWrapperRef, className: this.props.className }, this.slides.map(this.wrapSlide)),
            this.slides.length > 0 && this.portals.length > 0 && this.slides.map(this.renderIntoPortal)));
    }
}
export default Siema;
//# sourceMappingURL=siema-react.js.map