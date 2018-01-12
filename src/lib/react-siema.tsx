import React from 'react';
import SiemaBase, { SiemaOptions } from 'siema';

type SiemaProps = Overwrite<Omit<SiemaOptions, 'selector'>, {
    onChange?: (index: number) => void;
}>;

interface SiemaReactProps {
    clickable?: boolean;
    children: React.ReactNode[];
    className?: string;
}

class Siema extends React.Component<SiemaProps & SiemaReactProps> {
    private siemaWrapper;
    private siemaInstance;
    private slides;
    private options: SiemaOptions;

    public prev: SiemaBase['prev'] = (...args) => { this.siemaInstance.prev(...args); };
    public next: SiemaBase['next'] = (...args) => { this.siemaInstance.next(...args); };
    public goTo: SiemaBase['goTo'] = (...args) => { this.siemaInstance.goTo(...args); };

    constructor(props: SiemaProps & SiemaReactProps) {
        super(props);

        const {
            // options
            duration = 200,
            easing = 'ease-out',
            perPage = 1,
            startIndex = 0,
            draggable = true,
            multipleDrag = true,
            threshold = 20,
            loop = false,
            overflowHidden = true,
            preventClickOnDrag = false,
            onInit = () => undefined,
            onChange = () => undefined,
            // props
            clickable = false
        } = this.props;

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

        if (clickable) {
            this.slides = React.Children.map(this.props.children, (child, index) => {
                let childNode: React.ReactElement<any>;
                childNode =
                    (typeof child === 'string' || typeof child === 'number' || typeof child.type === 'undefined')
                        ? <div>{child}</div>
                        : child;
                return React.cloneElement(childNode, {
                    onClick: (e) => {
                        e.persist();
                        if (typeof childNode.props.onClick === 'function') {
                            childNode.props.onClick(e);
                        }
                        console.log('klik!', index, e, e.nativeEvent);
                        this.goTo(index);
                    }
                });
            });
            this.options.preventClickOnDrag = true;
        } else {
            this.slides = this.props.children;
        }
    }

    private getSiemaWrapperRef = (element) => { this.siemaWrapper = element; };

    public componentDidMount() {
        this.options.selector = this.siemaWrapper;
        this.siemaInstance = new SiemaBase(this.options);
    }

    public render() {
        return (
            <div ref={this.getSiemaWrapperRef} className={this.props.className}>
                {this.slides}
            </div>
        );
    }
}

export default Siema;
