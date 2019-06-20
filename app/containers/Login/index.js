import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { mapCss } from '../../libs/extensions';
import Parse from '../../parse/parseServer';
import classNames from 'classnames';
import helperUI from '../../libs/helperUI';
import axios from 'axios';

@observer
class Login extends Component {
    @observable loginModel = {
        loading: false
    }
    @observable accessToken = '';
    componentDidMount = async () => {
        if (window.location.href.length > 50) {
            this.accessToken = window.location.href.split("=")[1];
            await this.loginWithInstagram();
        }
    }

    loginWithFacebook = async () => {
        const users = await Parse.FacebookUtils.logIn();
        if (Parse.User.current()) {
            await users.save();
            window.location.replace('/')
        }
    }
    fetchTokenInstagram = async () => {
        window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=dfd788a5ad28434e84c3791e0db82e88&redirect_uri=${appConst.homePage}login&response_type=token`;
    }
    loginWithInstagram = async () => {
        await axios.get(`https://api.instagram.com/v1/users/self/?access_token=${this.accessToken}`)
            .then(async response => {
                const myAuthData = {
                    id: response.data.data.id,
                    access_token: this.accessToken
                }

                const user = new Parse.User();
                await user._linkWith('instagram', { authData: myAuthData });
                if (Parse.User.current()) {
                    await user.save({ fullname: response.data.data.full_name });
                    const ownProfile = Parse.User.current().get('profile');
                    await ownProfile.save({ avatar: response.data.data.profile_picture });
                    window.location.replace('/');
                }
            });
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const { userName, password } = this.loginModel;
        this.loginModel.loading = true;
        await Parse.User.logIn(userName, password)
            .catch(error => helperUI.alertError(error.message))
            .finally(() => this.loginModel.loading = false);

        if (Parse.User.current()) {
            window.location.replace('/')
        }
    }

    onChange = e => {
        const { name, value } = e.target;
        this[name] = value;
    };

    loadScript() {
        document.getElementsByTagName('body')[0].setAttribute('class', mapCss('skin-default', 'card-no-border'));
    }

    goSignUp = () => {
        this.props.history.push('/signup');
    }

    render() {
        this.loadScript();
        return (
            <section id="wrapper">
                <div className={mapCss("login-register")} style={{ backgroundImage: `url(${require('../../assets/css/images/background/login-register.jpg')})` }}>
                    <div className={mapCss('login-box', 'card')}>
                        <div className={mapCss("card-body")}>
                            <form className={mapCss('form-horizontal', 'form-material')} onSubmit={this.onSubmit}>
                                <div className={mapCss('text-center', 'm-b-20')}>
                                    <img src={require('../../assets/images/logo.png')}></img>
                                </div>
                                <div className={mapCss('form-group')}>
                                    <div className={mapCss("col-sm-12")}>
                                        <input className={mapCss("form-control")}
                                            type="text"
                                            onChange={event => this.loginModel.userName = event.target.value}
                                            required
                                            value={this.loginModel.userName}
                                            placeholder="Tên đăng nhập " />
                                    </div>
                                </div>
                                <div className={mapCss('form-group')}>
                                    <div className={mapCss("col-sm-12")}>
                                        <input className={mapCss("form-control")}
                                            type="password"
                                            value={this.loginModel.password}
                                            onChange={event => this.loginModel.password = event.target.value}
                                            required
                                            placeholder="Mật khẩu" />
                                    </div>
                                </div>
                                <div className={mapCss('form-group', 'row')}>
                                    <div className={mapCss("col-sm-12")}>
                                        <div className={mapCss('d-flex', 'no-block', 'align-items-center')}>
                                            <div className={mapCss('custom-control', 'custom-checkbox')}>
                                                <input type="checkbox" className={mapCss("custom-control-input")} checked onChange={() => { }} />
                                                <label className={mapCss("custom-control-label")} htmlFor="customCheck1">Ghi nhớ</label>
                                            </div>
                                            <div className={mapCss("ml-auto")}>
                                                <a href="javascript:void(0)" id="to-recover" className={mapCss("text-muted")}>
                                                    <i className={mapCss('fas', 'fa-lock', 'm-r-5')}></i> Quên mật khẩu?
                                                 </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={mapCss('form-group', 'text-center')}>
                                    <div className={mapCss('col-sm-12')}>
                                        <button className={mapCss('btn', 'btn-block', 'btn-info', classNames({
                                            [mapCss('disabled')]: this.loginModel.loading
                                        }))} type="submit">
                                            {this.loginModel.loading && <span className={mapCss('spinner-border', 'spinner-border-sm')} role="status" aria-hidden="true"></span>}
                                            &nbsp;<span>Đăng nhập</span>
                                        </button>
                                    </div>
                                </div>

                                <div className={mapCss('form-group', 'm-b-0')}>
                                    <div className={mapCss('col-sm-12', 'text-center')}>
                                        Chưa có tài khoản? <a href="javascript:void(0)" onClick={this.goSignUp} className={mapCss('text-info', 'm-l-5')}><b>Đăng kí</b></a>
                                    </div>
                                </div>
                            </form>
                            <div className={mapCss("row")}>
                                <div className={mapCss('col-sm-12', 'col-sm-12', 'col-md-12', 'm-t-5', 'text-center')}>
                                    <div className={mapCss("social")}>
                                        <button
                                            onClick={this.loginWithFacebook} style={{ minWidth: '40x' }}
                                            className={mapCss('btn', 'btn-facebook')} data-toggle="tooltip" title="Login with Facebook">
                                            <i aria-hidden="true" className={mapCss('fab', 'fa-facebook-f')}></i>
                                        </button>
                                        &nbsp;
                                            <button
                                            onClick={this.fetchTokenInstagram} style={{ minWidth: '40x' }}
                                            className={mapCss('btn', 'btn-googleplus')} data-toggle="tooltip" title="Login with Instagram">
                                            <i aria-hidden="true" className={mapCss('fab', 'fa-instagram')}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        )
    }
}

export default withRouter(Login);