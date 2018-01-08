import React from 'react';
import SiemaBase from 'siema';

interface SiemaProps {
    transitionTime: number;
}

class Siema extends React.Component<SiemaProps> {
    render() {
        return (
            <div>
                Siemaneczko!
            </div>
        );
    }
}

export default Siema;
