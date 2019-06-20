import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { mapCss } from '../../libs/extensions';
import classNames from 'classnames';
import Parse from '../../parse/parseServer';
import helperUI from '../../libs/helperUI';

@observer
export default class SignUp extends Component {
    @observable spinnig = false;

    @observable signUpModel = {

    };

    onSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = this.signUpModel;
        if (password === confirmPassword) {
            const currentUser = new Parse.User();
            currentUser.set("username", email);
            currentUser.set("password", password);
            currentUser.set("email", email);
            currentUser.set('fullname', name);
            await currentUser.signUp();
            if (Parse.User.current()) {
                this.props.history.push('/');
                helperUI.success(`Xin chào ${currentUser.get('fullname')}`);
            }
        }
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.signUpModel[name] = value;
    }

    loadScript() {
        document.getElementsByTagName('body')[0].setAttribute('class', mapCss('skin-default', 'card-no-border'));
    }

    render() {
        this.loadScript();
        const { name, email, password, confirmPassword } = this.signUpModel;
        return (
            <div className={mapCss("login-register")} style={{ backgroundImage: `url(${require('../../assets/css/images/background/login-register.jpg')})` }}>
                <div className={mapCss('login-box', 'card')}>
                    <div className={mapCss("card-body")}>
                        <form className={mapCss('form-horizontal', 'form-material')} id="loginform" onSubmit={this.onSubmit}>
                            <div className={mapCss('text-center', 'm-b-20')}>
                                <img src={require('../../assets/images/logo.png')}></img>
                            </div>
                            <div className={mapCss("form-group")}>
                                <div className={mapCss("col-sm-12")}>
                                    <input className={mapCss("form-control")} type="text" required placeholder="Họ và tên"
                                        name="name"
                                        value={name}
                                        onChange={this.onChange} />
                                </div>
                            </div>
                            <div className={mapCss("form-group")}>
                                <div className={mapCss("col-sm-12")}>
                                    <input className={mapCss("form-control")} type="text" required placeholder="Email"
                                        name="email"
                                        value={email}
                                        onChange={this.onChange} />
                                </div>
                            </div>
                            <div className={mapCss("form-group")}>
                                <div className={mapCss("col-sm-12")}>
                                    <input className={mapCss("form-control")} type="password" required placeholder="Mật khẩu"
                                        name="password"
                                        value={password}
                                        onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className={mapCss("col-sm-12")}>
                                    <input className={mapCss("form-control")} type="password" required placeholder="Nhập lại mật khẩu"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={this.onChange} />
                                </div>
                            </div>
                            <div className={mapCss('form-group', 'mt-4')}>
                                <div className={mapCss("col-md-12")}>
                                    <div className={mapCss('custom-control', 'custom-checkbox')}>
                                        <input type="checkbox" className={mapCss("custom-control-input")} id="customCheck1" />
                                        <label className={mapCss("custom-control-label")} htmlFor="customCheck1">
                                            Đồng ý với tất cả <a href="javascript:void(0)">điều khoản</a>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={mapCss('form-group', 'text-center', 'p-b-20')}>
                                <div className={mapCss("col-sm-12")}>
                                    <button className={mapCss('btn', 'btn-block', 'btn-info', classNames({
                                        [mapCss('disabled')]: this.spinnig
                                    }))} type="submit">
                                        {this.spinnig && <span className={mapCss('spinner-border', 'spinner-border-sm')} role="status" aria-hidden="true"></span>}
                                        &nbsp;<span>Đăng ký</span>
                                    </button>
                                </div>
                            </div>
                            <div className={mapCss('form-group', 'm-b-0')}>
                                <div className={mapCss('col-sm-12', 'text-center')}>
                                    Đã có tài khoản? <Link to="/login" className={mapCss('text-info', 'm-l-5')}><b>Đăng nhập</b></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
