import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { mapCss, changeAlias } from '../../libs/extensions';
import Parse from '../../parse/parseServer';
import { observer, inject } from 'mobx-react'
import { observe, observable, action, toJS } from 'mobx';
import Stores from '../../storeConfig/register';
import { AutoComplete } from 'antd';
import Notification from './components/notification';
import MenuProfile from './components/menuProfile';

@inject(Stores.LeftSideBarStore, Stores.ProfileStore, Stores.NotificationStore)
@observer
class Header extends Component {
    @observable profile = {};
    @observable istoggle = false;
    @observable istoggleMini = true;
    @observable mediaContent = [];
    state = {
        dataSource: [{
            value: 'd',
            text: 'asds'
        }],
        // dataSource: [],
    };

    fetchmediaContent = async () => {
        const media = await new Parse.Query('MediaContent')
            .equalTo('isDeleted', false)
            .find();
        var typeConvert = '';
        var url = '';
        media.map(media => {
            if (media.get('contentType') == 1) {
                typeConvert = 'Video';
                url = '/video-detail/' + changeAlias(media.get('title')) + "/" + media.id
            }
            else if (media.get('contentType') == 2) {
                typeConvert = 'Nhạc'
                url = '/audio-detail/' + changeAlias(media.get('title')) + "/" + media.id
            }
            else {
                typeConvert = "Album";
                url = '/album-detail/' + changeAlias(media.get('title')) + "/" + media.id
            }
            this.mediaContent.push({
                value: url,
                text: typeConvert + ": " + media.get('title')
            })

        })
        this.setState({
            dataSource: [...this.mediaContent]
        });
    }

    onSelect = mediaContent => {
        console.log('onSelect', mediaContent);
        this.props.history.push(mediaContent);
    }

    loadScript() {
        const $dropdown = $('[data-toggle="dropdown"]');
        const showClass = mapCss('show');

        $(document).click(function (e) {
            e.stopPropagation();
            const container = $dropdown;

            //check if the clicked area is dropDown or not
            if (container.has(e.target).length === 0) {
                $dropdown.parent().find('[data-classname="dropdown-menu"]').removeClass(showClass);
                $dropdown.removeClass(showClass);
            }
        })

        $dropdown.on('click', function () {
            $('[data-classname="dropdown-menu"]').removeClass(showClass)
            $(this).find('[data-classname="dropdown-menu"]').addClass(showClass);
        });
        if ($('body').width() < 576 && $('body').hasClass(mapCss('mini-sidebar')))
            $('body').removeClass(mapCss('mini-sidebar'));
    }

    @action
    async componentDidMount() {
        this.loadScript();
        this.props.profileStore.fetch();
        this.props.notificationStore.fetch();
        this.fetchmediaContent();
    }

    componentDidUpdate() {
        this.loadScript();

    }

    toggleSideBar = () => {
        this.istoggle = !this.istoggle;
        this.props.leftSideBarStore.isToggle = this.istoggle;
        this.istoggle ? $('body').addClass(mapCss('mini-sidebar')) : $('body').removeClass(mapCss('mini-sidebar'));
    }

    toggleMiniSidebar = () => {
        $('#left-sidebar').hasClass(mapCss('d-none')) ? $('#left-sidebar').removeClass(mapCss('d-none'))
            : $('#left-sidebar').addClass(mapCss('d-none'));
    }
    render() {
        const { dataSource } = this.state;
        return (
            <header className={mapCss("topbar")}>
                <nav className={mapCss('navbar', 'top-navbar', 'navbar-expand-md', 'navbar-dark')}>
                    <div className={mapCss("navbar-header")}>
                        <Link className={mapCss('navbar-brand')} to="/">
                            <h2 style={{ display: this.istoggle ? 'none' : 'inline-block', margin: 0, verticalAlign: 'middle' }} className={mapCss('text-white')}>STORII</h2>
                            <span style={{ display: !this.istoggle ? 'none' : 'inline-block' }}>
                                <h4 style={{ verticalAlign: 'middle' }} className={mapCss('text-white')}>STORII</h4>
                            </span>
                        </Link>
                    </div>

                    <div className={mapCss("navbar-collapse")}>
                        <ul className={mapCss('navbar-nav', 'mr-auto')}>
                            <li className={mapCss("nav-item")}>
                                <a className={mapCss('nav-link', 'nav-toggler', 'd-block', 'd-md-none')}
                                    onClick={this.toggleMiniSidebar}
                                    href="javascript:void(0)">
                                    <i className={mapCss("icon-menu")}></i>
                                </a>
                            </li>
                            <li className={mapCss("nav-item")}>
                                <a className={mapCss('nav-link', 'sidebartoggler', 'd-none', 'd-lg-block', 'd-md-block')}
                                    onClick={this.toggleSideBar}
                                    href="javascript:void(0)">
                                    <i className={mapCss("icon-menu")}></i>
                                </a>
                            </li>
                            <li className={mapCss("nav-item")}>
                                <form className={mapCss('app-search', 'd-none', 'd-md-block', 'd-lg-block')}>
                                    {/* <input type="text" className={mapCss("form-control")} placeholder="Tìm kiếm" /> */}
                                    <AutoComplete
                                        dataSource={dataSource}
                                        style={{
                                            width: 400,
                                        }}
                                        onSelect={this.onSelect}
                                        placeholder="Tìm kiếm"
                                        filterOption={(inputValue, option) =>
                                            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    />
                                </form>
                            </li>
                        </ul>

                        <ul className={mapCss('navbar-nav', 'my-lg-0')} >
                            <Notification />
                            <MenuProfile />
                        </ul>
                    </div>
                </nav>
            </header >
        );
    }
}
export default withRouter(Header);