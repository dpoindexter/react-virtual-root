import * as React from 'react';

type VirtualRootProps = {
    children: React.ReactNode | React.ReactNode[];
};

class VirtualRoot extends React.Component<VirtualRootProps> {
    render() {
        return React.Children.count(this.props.children) === 1 ? (
            <div>{this.props.children}</div>
        ) : (
            this.props.children
        );
    }
}

export default VirtualRoot;
