import * as React from 'react';
import SiemaBase from 'siema';
class Siema extends React.Component {
    constructor(props) {
        super(props);
        this.prev = (...args) => { this.siemaInstance.prev(...args); };
        this.next = (...args) => { this.siemaInstance.next(...args); };
        this.goTo = (...args) => { this.siemaInstance.goTo(...args); };
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
    }
    componentWillReceiveProps(nextProps) {
        this.slides = this.addClickEventForClickable(nextProps.children, nextProps.clickable);
    }
    componentDidMount() {
        this.options.selector = this.siemaWrapper;
        this.siemaInstance = new SiemaBase(this.options);
    }
    render() {
        return (React.createElement("div", { ref: this.getSiemaWrapperRef, className: this.props.className }, this.slides));
    }
}
export default Siema;
//# sourceMappingURL=siema-react.js.map