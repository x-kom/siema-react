import React from 'react';
import SiemaBase, { SiemaOptions as SiemaBaseOptions } from 'siema';

interface SiemaProps {
    children: React.ReactNode[];
    className?: string;
}

class Siema extends React.Component<SiemaBaseOptions & { overflowHidden?: boolean } & SiemaProps> {
    private siemaWrapper;
    public siemaInstance;
    private getSiemaWrapperRef = (element) => { this.siemaWrapper = element; };

    public componentDidMount() {
        const {
            duration = 200,
            easing = 'ease-out',
            perPage = 1,
            startIndex = 0,
            draggable = true,
            multipleDrag = true,
            threshold = 20,
            loop = false,
            overflowHidden = true,
            onInit = () => undefined,
            onChange = () => undefined,
        } = this.props;
        this.siemaInstance = new SiemaBase({
            selector: this.siemaWrapper,
            duration,
            easing,
            perPage,
            startIndex,
            draggable,
            multipleDrag,
            threshold,
            loop,
            overflowHidden,
            onInit,
            onChange: () => onChange(this.siemaInstance.currentSlide),
        } as any);
    }

    public render() {
        return (
            <div ref={this.getSiemaWrapperRef} className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}

export default Siema;
