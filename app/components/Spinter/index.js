import React, { Component } from 'react';
import { mapCss } from '../../libs/extensions';

class Spinter extends Component {
    render() {
        const { style } = this.props;
        return (
            this.props.spinning && <span className={mapCss('spinner-border')} {...style} role="status" aria-hidden="true"></span>
        );
    }
}

Spinter.defaultProps = {
    spinning: true
}

export default Spinter;