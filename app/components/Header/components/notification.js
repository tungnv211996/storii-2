import React, { Component } from 'react';
import { mapCss } from '../../../libs/extensions';
import { observer, inject } from "mobx-react";
import Stores from '../../../storeConfig/register';
import Parse from '../../../parse/parseServer';
import { withRouter } from 'react-router-dom';

@inject(Stores.NotificationStore)
@observer
class Notification extends Component {
    notifiIcon = {
        1: mapCss('fas', 'fa-thumbs-up'),
        2: mapCss('fas', 'fa-comment-alt'),
        3: mapCss('fas', 'fa-user-plus')
    }

    componentDidMount() {

    }

    read = item => {
        item.isRead = true;
        const notification = new Parse.Object('Notification');
        notification.id = item.id;
        notification.save({
            isRead: true
        });
    }
    nagative = () => {
        this.props.history.push('/notifications')
    }
    render() {
        const { notifications } = this.props.notificationStore;
        const hasNew = notifications.some(item => !item.isRead);
        return (
            <li className={mapCss('nav-item', 'dropdown')} data-toggle="dropdown">
                <a className={mapCss('nav-link', 'dropdown-toggle')} href="javascript:void(0)" aria-haspopup="true" aria-expanded="false">
                    <i className={mapCss('fas', 'fa-bell')}></i>
                    {
                        hasNew && <div className={mapCss("notify")}>
                            <span className={mapCss("heartbit")}></span>
                            <span className={mapCss("point")}></span>
                        </div>
                    }
                </a>
                <div style={{ width: 450 }} className={mapCss('dropdown-menu', 'dropdown-menu-right', 'mailbox')} data-classname="dropdown-menu">
                    <ul>
                        <li>
                            <div className={mapCss("drop-title")}>Thông báo</div>
                        </li>
                        <li>
                            <div className={mapCss('message-center')}>
                                {
                                    notifications.map(item => {
                                        const desc = [item.title, (item.content || '')].filter(item => Boolean(item)).join(' - ');
                                        return (
                                            <a href="javascript:void(0)"
                                                key={item.id}
                                                style={{ backgroundColor: !item.isRead ? 'aliceblue' : '#fff' }}
                                                onClick={() => this.read(item)}>
                                                <div
                                                    className={mapCss('btn', 'btn-lg', 'btn-circle')}
                                                    style={{ backgroundImage: `url(${item.from.avatar})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                                                </div>
                                                <div className={mapCss("mail-contnet")} style={{ width: '80%' }}>
                                                    <h5>{item.from.fullname}</h5>
                                                    <span className={mapCss("mail-desc")}>{desc}</span>
                                                    <span className={mapCss("time")}><i className={mapCss(this.notifiIcon[item.notifyType], 'text-info')} ></i>  {item.createdAtFormat}</span>
                                                </div>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </li>
                        <li>
                            <a onClick={this.nagative} className={mapCss('nav-link', 'text-center', 'link')} href="javascript:void(0);">
                                <strong>Xem tất cả thông báo</strong>
                                &nbsp;<i className={mapCss('fa', 'fa-angle-right')}></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
        )
    }
}
export default withRouter(Notification)