import * as React from 'react';
import SiemaBase, { SiemaOptions } from 'siema';
export declare type Diff<T extends string, U extends string> = ({
    [P in T]: P;
} & {
    [P in U]: never;
} & {
    [x: string]: never;
})[T];
export declare type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
export declare type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;
export declare type SiemaReactProps = Overwrite<Omit<SiemaOptions, 'selector'>, {
    onChange?: (index: number) => void;
}> & {
    clickable?: boolean;
    children?: React.ReactNode[];
    className?: string;
};
declare class Siema extends React.Component<SiemaReactProps> {
    private siemaWrapper;
    private siemaInstance;
    private slides;
    private options;
    prev: SiemaBase['prev'];
    next: SiemaBase['next'];
    goTo: SiemaBase['goTo'];
    constructor(props: SiemaReactProps);
    private getSiemaWrapperRef;
    private addClickEventForClickable;
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default Siema;
