import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SiemaBase from 'siema';
class SiemaWrapper extends React.Component {
    // since all further children updates will be handled in "componentDidUpdate" of the main Siema component
    // we render this wrapper only once instead of inserting the children in "componentDidMount"
    // it will make the component SSR-compatible
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
        const { 
        // options
        duration = 200, easing = 'ease-out', perPage = 1, startIndex = 0, draggable = true, multipleDrag = true, threshold = 20, loop = false, overflowHidden = true, preventClickOnDrag = false, onInit = () => undefined, onChange = () => undefined, 
        // props
        clickable = false } = this.props;
        this.options = {
            selector: null,
            duration,
            easing,
            perPage,
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
        if (document && document.createElement) {
            this.portal = document.createElement('div');
        }
    }
    componentWillReceiveProps(nextProps) {
        this.slides = this.addClickEventForClickable(nextProps.children, nextProps.clickable);
    }
    componentDidMount() {
        this.options.selector = this.siemaWrapper;
        this.siemaInstance = new SiemaBase(this.options);
        window.SIEMA = this.siemaInstance;
    }
    componentDidUpdate() {
        const newSlides = this.portal.children;
        const oldSlides = this.siemaWrapper.children[0].children;
        const currentSlide = this.siemaInstance.currentSlide;
        // first, let's get rid of excessive slides
        const excessiveSlides = oldSlides.length - newSlides.length;
        for (let i = 0; i < excessiveSlides; ++i) {
            this.siemaInstance.remove(oldSlides.length - 1);
        }
        // now we can replace old slides with a new ones
        for (let i = 0; i < newSlides.length; ++i) {
            const newSlide = newSlides[i].cloneNode(true);
            const oldSlide = oldSlides[i];
            if (oldSlide) {
                this.siemaInstance.remove(i);
                this.siemaInstance.insert(newSlide, i);
                // TODO: think about a method to replace only when props actually did changed (if it's possible at all..?)
                // I wish there wes a "replace" method in Siema...
            }
            else {
                this.siemaInstance.append(newSlide);
            }
        }
        // since "remove & insert" procedure can mess up current slide state, we restore the previous position (or the closest possible one)
        this.siemaInstance.goTo(Math.min(currentSlide, newSlides.length));
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(SiemaWrapper, { innerRef: this.getSiemaWrapperRef, className: this.props.className }, this.slides),
            this.portal && ReactDOM.createPortal(this.slides, this.portal)));
    }
}
export default Siema;
//# sourceMappingURL=siema-react.js.map