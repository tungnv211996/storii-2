import { Spin, Alert } from 'antd';
import React, { Component } from 'react';
import { mapCss } from '../../libs/extensions';
class Loading extends Component {

    render() {
        const { flat } = this.props;
        if (flat)
            return (
                // <Spin
                //     style={{ zIndex: 100, height: '100vh', width: '100vw', position: 'fixed', background: 'rgba(255, 255, 255, 0.48)' }}
                //     tip="Loading...">
                // </Spin>
                <div className={mapCss("loading")}>
                    <Spin />
                </div>
            );
        return (
            <div></div>
        );
    }
}
export default Loading;