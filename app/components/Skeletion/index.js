import { Skeleton } from 'antd';
import React, { Component } from 'react';
import { mapCss } from '../../libs/extensions';
class SkeletonCutomize extends Component {

  render() {
    const { pageSize } = this.props;
    let skeleton = [];
    for (let i = 0; i < pageSize; i++) {
      skeleton.push(
        <Skeleton className={mapCss('col-lg-2', 'col-md-6')}
          loading={true} active key={i}        >
        </Skeleton>)
    }
    return (
      <div className={mapCss("row")}>
        {skeleton}
      </div>
    );
  }
}
export default SkeletonCutomize;