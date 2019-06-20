import React, { Component } from 'react';
import { mapCss } from '../../libs/extensions';
import { observer, inject } from "mobx-react";
import Stores from '../../storeConfig/register';


@inject(Stores.NotificationStore)
@observer
export default class NotificationsPage extends Component {
    notifiIcon = {
        1: mapCss('fas', 'fa-thumbs-up'),
        2: mapCss('fas', 'fa-comment-alt'),
        3: mapCss('fas', 'fa-user-plus')
    }

    componentDidMount() {
        this.props.notificationStore.fetch();
    }

    render() {
        const { notifications } = this.props.notificationStore;
        return (
            <div>
                <div className={mapCss("row", "page-titles")}>
                    <div className={mapCss("col-md-5", "align-self-center")}>
                        <h4 className={mapCss("text-themecolor")}>Thông báo</h4>
                    </div>
                    <div className={mapCss("col-md-7", "d-none", "d-sm-block", "align-self-center", "text-right")}>
                        <div className={mapCss("d-flex", "justify-content-end", "align-items-center")}>
                            <ol className={mapCss("breadcrumb")}>
                                <li className={mapCss("breadcrumb-item")}><a href="javascript:void(0)">Trang chủ</a></li>
                                <li className={mapCss("breadcrumb-item", "active")}>Thông báo</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className={mapCss("row", "el-element-overlay")}>
                    <div className={mapCss("col-md-12")}>
                        <div className={mapCss("card")}>
                            {
                                notifications.map(item => {
                                    const desc = [item.title, (item.content || '')].filter(item => Boolean(item)).join(' - ');
                                    return (
                                        <div className={mapCss("card-body", "p-l-30")}>

                                            <a href="javascript:void(0)" className={mapCss('row')} key={item.id}>
                                                <div
                                                    className={mapCss('btn', 'btn-lg', 'btn-circle')}
                                                    style={{ backgroundImage: `url(${item.from.avatar})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                                                </div>
                                                <div className={mapCss("mail-contnet")} style={{ width: '80%' }}>
                                                    <div className={mapCss("p-l-20")}>
                                                        <div className={mapCss('row')}>
                                                            <h5>{item.from.fullname}</h5>
                                                            <span className={mapCss("mail-desc", "p-l-10")}>{desc}</span>
                                                        </div>
                                                        <span className={mapCss("time")}><i className={mapCss(this.notifiIcon[item.notifyType], 'text-info')} ></i>  {item.createdAtFormat}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}