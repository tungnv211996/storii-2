import React, { Component } from 'react';
import { mapCss } from '../../../libs/extensions';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import Stores from '../../../storeConfig/register';
import ImageUpload from '../../../components/ImageUpload';
import Parse from '../../../parse/parseServer';


@inject(Stores.ProfileStore)
@observer
class Left extends Component {

    imageUploadChange = async url => {
        console.log({ url });
        const { profile } = this.props.profileStore;
        this.props.profileStore.setProfile({
            ...profile,
            avatar: url
        });

        const dbProfile = Parse.User.current().get('profile');
        await dbProfile.save({ avatar: url });

    }

    render() {
        const { profile } = this.props.profileStore;
        return (
            <div className={mapCss('card', 'mt-4')}>
                <div className={mapCss('card-body')}>
                    <center className={mapCss("m-t-30")}>
                        <img style={{ width: 200, height: 200 }} src={profile.avatar || require('../../../assets/images/user.png')} className={mapCss("img-circle")} width="150" />
                        <h4 className={mapCss('card-title', 'm-t-10')}>{profile.fullname} ({profile.aliasName})</h4>
                        <h6 className={mapCss("card-subtitle")}>{profile.nationality}</h6>
                        <div className={mapCss('row', 'text-center', 'justify-content-md-center')}>
                            <div className={mapCss("col-6")}>
                                <a href="javascript:void(0)" className={mapCss("link")}>
                                    <i className={mapCss("icon-people")}></i> <font className={mapCss("font-medium")}>254</font>
                                </a>
                            </div>
                            <div className={mapCss("col-6")}>
                                <a href="javascript:void(0)" className={mapCss("link")} >
                                    <i className={mapCss("icon-picture")}></i> <font className={mapCss("font-medium")}>54</font>
                                </a>
                            </div>
                        </div>
                        <div className={mapCss('mt-2')}>
                            <ImageUpload onChange={this.imageUploadChange} title="Cập nhật ảnh đại diện" />
                        </div>
                    </center>
                    <hr />
                    <div className={mapCss("card-body")}>
                        <small className={mapCss("text-muted")}>Số dư</small>
                        <h6>{(profile.wallet.balanceAmount || 0).toVND()} {profile.wallet.unit}</h6>
                        <small className={mapCss("text-muted")}>Email</small>
                        <h6>{profile.email}</h6>
                        <small className={mapCss('text-muted', 'p-t-30', 'db')}>Số điện thoại</small>
                        <h6>{profile.phoneNumber}</h6>
                        <small className={mapCss('text-muted', 'p-t-30', 'db')}>Địa chỉ</small>
                        <h6>{profile.address}</h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default Left;