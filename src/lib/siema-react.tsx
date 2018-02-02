import * as React from 'react';
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

class Siema extends React.Component<SiemaReactProps> {
    private siemaWrapper;
    private siemaInstance;
    private slides;
    private options: SiemaOptions;

    public prev: SiemaBase['prev'] = (...args) => { this.siemaInstance.prev(...args); };
    public next: SiemaBase['next'] = (...args) => { this.siemaInstance.next(...args); };
    public goTo: SiemaBase['goTo'] = (...args) => { this.siemaInstance.goTo(...args); };

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
    }

    private getSiemaWrapperRef = (element) => { this.siemaWrapper = element; };

    private addClickEventForClickable = (children, clickable) => {
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

    public componentWillReceiveProps(nextProps) {
        this.slides = this.addClickEventForClickable(nextProps.children, nextProps.clickable);
    }

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
