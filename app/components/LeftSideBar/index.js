import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { mapCss } from '../../libs/extensions';
import Parse from '../../parse/parseServer';
import Stores from '../../storeConfig/register';
import { Link } from 'react-router-dom';
import SubscribedChanel from './components/subscribedChanel';
import { Tooltip } from 'antd';


@inject(Stores.LeftSideBarStore)
@observer
export default class LeftSideBar extends React.Component {
  @observable profile = {};
  @observable isToggle = true;
  @observable profileMenu = {
    active: false
  }
  @observable chanels = [];

  openProfileMenu = () => {
    this.profileMenu.active = !this.profileMenu.active;
  }

  toggleSidebar = () => {
    $('body').on('click', 'ul#sidebarnav li', function () {
      if (!$('#left-sidebar').hasClass(mapCss('d-none'))) {
        $('#left-sidebar').addClass(mapCss('d-none'))
      }
    })
  }
  componentDidMount() {
    this.toggleSidebar();
  }
  render() {

    const { isToggle } = this.props.leftSideBarStore;
    return (
      <aside className={mapCss("left-sidebar", "d-none", "d-md-block")} id='left-sidebar'
        style={{ overflowX: 'auto' }}>
        <div className={mapCss("scroll-sidebar")}>
          <nav className={mapCss("sidebar-nav")}>
            <ul id="sidebarnav" >
              <li>
                <Tooltip title="Trang chủ">
                  <Link to="/" >
                    <i className={mapCss('fas', 'fa-home')}></i>
                    {!isToggle && <span>Trang chủ</span>}
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="ST-SOUND">
                  <Link to="/audios">
                    <i className={mapCss('fas', 'fa-music')}></i>
                    {!isToggle && <span className={mapCss("hide-menu")}>ST-SOUND</span>}
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="ST-TUBE">
                  <Link to="/videos" href="javascript:void(0)" >
                    <i className={mapCss('fas', 'fa-film')}></i>
                    {!isToggle && <span className={mapCss("hide-menu", "p-t-2")}>ST-TUBE</span>}
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="POST">
                  <Link to="/posts" href="javascript:void(0)" >
                    <i className={mapCss('far', 'fa-sticky-note')}></i>
                    {!isToggle && <span className={mapCss("hide-menu", "p-t-2")}>BÀI VIẾT</span>}
                  </Link>
                </Tooltip>
              </li>
              <li className={mapCss("nav-small-cap")} hidden={isToggle}>--- Thư viện</li>
              <li>
                <Tooltip title="Kênh đăng ký">
                  <Link to="/subscriptions" href="javascript:void(0)">
                    <i className={mapCss('fa', 'fa-play')}></i>
                    {!isToggle && <span className={mapCss("hide-menu")}>Kênh đăng ký</span>}
                  </Link>
                </Tooltip>
                <Tooltip title="Lịch sử">
                  <Link to="/history" href="javascript:void(0)">
                    <i className={mapCss('fa', 'fa-hourglass-half')}></i>
                    {!isToggle && <span className={mapCss("hide-menu")}>Lịch sử</span>}
                  </Link>
                </Tooltip>
                <Tooltip title="Xem sau">
                  <Link to="/history" href="javascript:void(0)">
                    <i className={mapCss('fa', 'fa-history')}></i>
                    {!isToggle && <span className={mapCss("hide-menu")}>Xem sau</span>}
                  </Link>
                </Tooltip>
                <Tooltip title="Playlist">
                  <Link to="/playlist" href="javascript:void(0)">
                    <i className={mapCss('fas', 'fa-list')}></i>
                    {!isToggle && <span className={mapCss("hide-menu")}>Playlist</span>}
                  </Link>
                </Tooltip>
              </li>

              <SubscribedChanel />
            </ul>
          </nav>
        </div>
      </aside>
    )
  }
}