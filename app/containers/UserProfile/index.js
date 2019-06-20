import React, { Component } from 'react';
import { mapCss } from '../../libs/extensions';
import Parse from '../../parse/parseServer';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import MediaContent from './components/mediaContent';
import UserInfo from './components/userInfo';
import PlayerAlbum from '../Album/components/playerAlbum';

class UserProfile extends Component {

    render() {
        return (
            <div>
                <div className={mapCss("row", "page-titles")}>
                    <div className={mapCss("col-md-5", "align-self-center")}>
                        <h4 className={mapCss("text-themecolor")}>Phim ảnh</h4>
                    </div>
                    <div className={mapCss("col-md-7", "align-self-center text-right")}>
                        <div className={mapCss("d-flex", "justify-content-end", "align-items-center")}>
                            <ol className={mapCss("breadcrumb", "p-r-15")}>
                                <li className={mapCss("breadcrumb-item")}><a href="javascript:void(0)">Trang chủ</a></li>
                                <li className={mapCss("breadcrumb-item", "active")}>Phim ảnh</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className={mapCss("row")}>
                    <UserInfo />
                    <MediaContent />
                </div>
                <PlayerAlbum id={[]} />
            </div>
        )
    }
}
export default withRouter(UserProfile);