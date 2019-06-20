import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import Loading from '../../../components/Loading/index';
import { mapCss } from '../../../libs/extensions';
import Parse from '../../../parse/parseServer';

@observer
class UserInfo extends Component {
    @observable flat = false;
    @observable userProfile = [];
    @observable isSubscribed = false;
    @observable id = this.props.match.params.id;

    componentDidMount = async () => {
        this.flat = true;
        await this.fetchUserProfile();
        this.isSubscribed = this.userProfile.isSubscribed;
        this.flat = false;
    }

    fetchUserProfile = async () => {
        this.userProfile = await Parse.Cloud.run('getProfileByUserId', {
            userId: this.id
        });
    }
    subscribeVideo = async (userId) => {
        const res = await Parse.Cloud.run('subscribe', {
            chanelId: userId,
        });
        this.isSubscribed = res.isSubscribed;
    }

    unSubscribeVideo = async (userId) => {
        const res = await Parse.Cloud.run('unsubscribe', {
            chanelId: userId,
        });
        this.isSubscribed = res.isSubscribed;
    }
    render() {
        const { userProfile } = this
        const avatar = userProfile ? userProfile.avatar : null;
        const dob = userProfile.dob ? userProfile.dob.toISOString().replace('-', '/').split('T')[0].replace('-', '/') : '';
        const gender = userProfile.gender == 1 ? "Nam" : "Nữ";
        return (
            <div className={mapCss("col-md-3")}>
                <div className={mapCss("card")}>
                    <div className={mapCss('card')}>
                        <div className={mapCss("user-bg")}> <img style={{ height: 'auto', width: '100%' }} alt="user" src={avatar || require('../../../assets/images/user.png')} /> </div>

                        <div className={mapCss('card-body', 'row')}>
                            <div className={mapCss("row", "text-center", "m-t-10")}>
                                <div className={mapCss("col-md-12", "border-bottom", "m-b-20", "p-b-20")}>
                                    <h5 className={mapCss("card-title")}>{userProfile.fullname}</h5>
                                    <div className={mapCss("m-b-5")}>{userProfile ? userProfile.subscriberCount : 0} người đăng ký</div>
                                    {this.id !== Parse.User.current().id ? <a >
                                        {!this.isSubscribed ? <span onClick={() => this.subscribeVideo(this.id)}
                                            className={mapCss('btn', 'btn-primary')}>ĐĂNG KÝ</span> :
                                            <span onClick={() => this.unSubscribeVideo(this.id)}
                                                className={mapCss('btn', 'btn-secondary')}>HỦY ĐĂNG KÝ</span>}
                                    </a> : null}
                                </div>
                                <div className={mapCss("col-md-6", "border-right")}>
                                    <strong>Ngày sinh</strong>
                                    <p>{dob ? dob : "Chưa rõ"}</p>
                                </div>
                                <div className={mapCss("col-md-6")}><strong>Giới tính</strong>
                                    <p>{gender}</p>
                                </div>
                                <hr style={{ width: '100%' }} />
                                <div className={mapCss("col-md-12")}><strong>Số lượng nội dung</strong>
                                    <p>{userProfile.mediaContentCount}</p>
                                </div>

                                <hr style={{ width: '100%' }} />
                                <div style={{ width: '100%' }} className={mapCss("row", "text-center", "m-t-10")}>
                                    <div className={mapCss("col-md-12")}><strong>Address</strong>
                                        <p>{userProfile.address}<br />{userProfile.nationality}</p>
                                    </div>
                                </div>
                                <hr style={{ width: '100%' }} />

                                <br />
                                <div style={{ width: '100%' }} className={mapCss("row", "m-t-15")}>
                                    <div className={mapCss("col-md-4", "col-sm-4", "text-center")}>
                                        <p className={mapCss("text-purple")}><i className={mapCss("fab", "fa-facebook-f")} /></p>
                                        <h1>258</h1> </div>
                                    <div className={mapCss("col-md-4", "col-sm-4", "text-center")}>
                                        <p className={mapCss("text-blue")}><i className={mapCss("fab", "fa-twitter")} /></p>
                                        <h1>125</h1> </div>
                                    <div className={mapCss("col-md-4", "col-sm-4", "text-center")}>
                                        <p className={mapCss("text-danger")}><i className={mapCss("fab", "fa-google")} /></p>
                                        <h1>140</h1> </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(UserInfo);