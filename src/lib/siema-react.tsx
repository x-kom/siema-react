import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SiemaBase, { SiemaOptions } from 'siema';

export type Diff<T extends string, U extends string> = ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
export type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;

export type SiemaReactProps =
    Overwrite<Omit<SiemaOptions, 'selector'>, {
        onChange?: (index: number) => void;
    }> & {
        clickable?: boolean;
        children?: React.ReactNode[];
        className?: string;
    };

class SiemaWrapper extends React.Component<{ innerRef: (el: HTMLElement) => void; className: string }> {
    // since all further children updates will be handled in "componentDidUpdate" of the main Siema component
    // we render this wrapper only once instead of inserting the children in "componentDidMount"
    // it will make the component SSR-compatible
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div ref={this.props.innerRef} className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}

class Siema extends React.Component<SiemaReactProps> {
    private siemaWrapper;
    private siemaInstance: SiemaBase;
    private slides: React.ComponentType[];
    private portal;
    private options: SiemaOptions;

    public prev: SiemaBase['prev'] = (...args) => { this.siemaInstance.prev(...args); };
    public next: SiemaBase['next'] = (...args) => { this.siemaInstance.next(...args); };
    public goTo: SiemaBase['goTo'] = (...args) => { (this.siemaInstance.goTo as any)(...args); }; // TODO: improve types

    constructor(props: SiemaReactProps) {
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

        this.slides = this.addClickEventForClickable(this.props.children, clickable);
        if (document && document.createElement) {
            this.portal = document.createElement('div');
        }
    }

    private getSiemaWrapperRef = (element) => { this.siemaWrapper = element; };

    private addClickEventForClickable = (children, clickable: boolean) => {
        if (clickable) {
            this.options.preventClickOnDrag = true;
            return React.Children.map(children, (child, index) => {
                let childNode: React.ReactElement<any>;
                childNode =
                    (typeof child === 'string' || typeof child === 'number' || typeof child.type === 'undefined')
                        ? <div>{child}</div>
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
        } else {
            return children;
        }
    }

    public componentWillReceiveProps(nextProps: SiemaReactProps) {
        this.slides = this.addClickEventForClickable(nextProps.children, nextProps.clickable);
    }

    public componentDidMount() {
        this.options.selector = this.siemaWrapper;
        this.siemaInstance = new SiemaBase(this.options);
        (window as any).SIEMA = this.siemaInstance;
    }

    public componentDidUpdate() {
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
            } else {
                this.siemaInstance.append(newSlide);
            }
        }

        // since "remove & insert" procedure can mess up current slide state, we restore the previous position (or the closest possible one)
        this.siemaInstance.goTo(Math.min(currentSlide, newSlides.length));
    }

    public render() {
        return (
            <React.Fragment>
                <SiemaWrapper innerRef={this.getSiemaWrapperRef} className={this.props.className}>
                    {this.slides}
                </SiemaWrapper>
                {this.portal && ReactDOM.createPortal(this.slides, this.portal)}
            </React.Fragment>
        );
    }
}

export default Siema;
