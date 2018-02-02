import * as React from 'react';
import SiemaBase, { SiemaOptions } from 'siema';
export declare type SiemaProps = Overwrite<Omit<SiemaOptions, 'selector'>, {
    onChange?: (index: number) => void;
}>;
export interface SiemaReactProps {
    clickable?: boolean;
    children: React.ReactNode[];
    className?: string;
}
declare class Siema extends React.Component<SiemaProps & SiemaReactProps> {
    private siemaWrapper;
    private siemaInstance;
    private slides;
    private options;
    prev: SiemaBase['prev'];
    next: SiemaBase['next'];
    goTo: SiemaBase['goTo'];
    constructor(props: SiemaProps & SiemaReactProps);
    private getSiemaWrapperRef;
    private addClickEventForClickable;
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default Siema;
