import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Stores from '../../storeConfig/register';
import Thumbnail from '../../components/Thumbnail';
import { Spin, Icon } from 'antd';
import { observable } from 'mobx';
import { mapCss } from '../../libs/extensions';

@inject(Stores.MediaContentStore)
@observer
class Subscription extends Component {
    @observable spinning = false;

    componentDidMount() {
        this.spinning = true;
        this.props.mediaContentStore.fetchSubscription({ pageSize: 24 }).finally(() => this.spinning = false);
    }

    render() {
        const { subscriptions } = this.props.mediaContentStore;
        return (
            <React.Fragment>
                <div className={mapCss("row", "page-titles")}>
                    <div className={mapCss("col-md-5", "align-self-center")}>
                        <h4 className={mapCss("text-themecolor")}>KÊNH ĐĂNG KÝ</h4>
                    </div>
                </div>
                <div>
                    <div className={mapCss("row", "el-element-overlay")}>
                        <div className={mapCss("col-md-12")}>
                            <div className={mapCss("card")}>
                                <div className={mapCss("card-body")}>
                                    <Spin spinning={this.spinning} size="large" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                                        <div className={mapCss('row')}>
                                            {
                                                subscriptions.map(item => <Thumbnail infoMedia={item} key={item.id} />)
                                            }
                                        </div>
                                    </Spin>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Subscription;