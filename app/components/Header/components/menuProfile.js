import React, { Component } from 'react';
import { mapCss } from '../../../libs/extensions';
import { observer, inject } from "mobx-react";
import Stores from '../../../storeConfig/register';
import { withRouter, Link } from 'react-router-dom';
import Parse from '../../../parse/parseServer';


@inject(Stores.LeftSideBarStore, Stores.ProfileStore)
@observer
class MenuProfile extends Component {
    shouldComponentUpdate() {
        return true;
    }

    onLogout = () => {
        Parse.User.logOut().then(() => this.props.history.push('/login'));
    }

    render() {
        const { profile } = this.props.profileStore;
        return (
            <li className={mapCss('nav-item', 'dropdown', 'u-pro')} data-toggle="dropdown">
                <a className={mapCss('nav-link', 'dropdown-toggle', 'profile-pic', 'text-white', 'text-bold')}
                    href="javascript:void(0)"
                    aria-haspopup="true"
                    aria-expanded="false">
                    <img src={profile.avatar || require('../../../assets/images/user.png')} alt="user-img" style={{ height: 32, width: 32 }} className={mapCss("img-circle")} />
                    <span className={mapCss("hidden-md-down")}>
                        &nbsp;{profile.fullname}
                        &nbsp;<i className={mapCss('fa', 'fa-angle-down')}></i>
                    </span>
                </a>
                <div className={mapCss('dropdown-menu', 'dropdown-menu-right')} data-classname="dropdown-menu">
                    <Link className={mapCss("dropdown-item")} to="/profile">
                        <i className={mapCss("fa", "fa-user")}></i> Thông tin cá nhân
                </Link>
                    <Link className={mapCss("dropdown-item")} to="/coin">
                        <i className={mapCss('far', 'fa-money-bill-alt')}></i> Nạp xu
                </Link>
                    <Link to="/my-order" className={mapCss("dropdown-item")}>
                        <i className={mapCss("fas", "fa-shopping-cart")}></i> Đơn hàng của tôi
                </Link>
                    <a href="javascript:void(0)" className={mapCss("dropdown-item")}>
                        <i className={mapCss("fas", "fa-bars")}></i> Lịch sử giao dịch
                </a>
                    <a href="javascript:void(0)" onClick={this.onLogout} className={mapCss("dropdown-item")}>
                        <i className={mapCss('fa', 'fa-power-off')}></i> Đăng xuất
                 </a>
                </div>
            </li>
        )
    }
}

export default withRouter(MenuProfile);