import React, { Component } from 'react';
import { mapCss } from '../../../libs/extensions';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Form, Input, Select, Radio } from 'antd';
import Stores from '../../../storeConfig/register';
import countries from '../../../data_json/countries.json';
import Parse from '../../../parse/parseServer';
import helperUI from '../../../libs/helperUI';

@inject(Stores.ProfileStore)
@observer
class Right extends Component {
    @observable tab = {
        selectedKey: ''
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const ownProfile = Parse.User.current().get('profile');
                await ownProfile.save(values);
                this.props.profileStore.setProfile(await Parse.Cloud.run('fetchUserProfile'));
                await helperUI.success('Cập nhật thành công');
            }
        });
    }

    render() {
        const { profile } = this.props.profileStore;
        const formItemLayout = {
            labelCol: {
                xs: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 20 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={mapCss("card", "mt-4")}>
                <ul className={mapCss('nav', 'nav-tabs', 'profile-tab')} role="tablist">
                    <li className={mapCss("nav-item")}> <a className={mapCss("nav-link", "active")} data-toggle="tab" data-target="#settings" role="tab">Thông tin cá nhân</a> </li>
                </ul>

                <div className={mapCss("tab-content")}>
                    <div className={mapCss("tab-pane", "active")} id="settings" role="tabpanel">
                        <div className={mapCss("card-body")}>
                            <Form {...formItemLayout} onSubmit={this.onSubmit}>
                                <Form.Item label="Email" className={mapCss("mb-0")}>
                                    {getFieldDecorator('email', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                        initialValue: profile.email
                                    })(
                                        <Input disabled />
                                    )}
                                </Form.Item>
                                <Form.Item label="Tên đầy đủ" className={mapCss("mb-0")}>
                                    {getFieldDecorator('fullname', {
                                        rules: [{ required: true, message: 'Hãy nhập vào họ tên!' }],
                                        initialValue: profile.fullname
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                                <Form.Item label="Bí danh" className={mapCss("mb-0")}>
                                    {getFieldDecorator('aliasName', {
                                        initialValue: profile.aliasName
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                                <Form.Item label="Giới tính" className={mapCss("mb-0")}>
                                    {getFieldDecorator('gender', {
                                        initialValue: profile.gender
                                    })(
                                        <Radio.Group >
                                            <Radio value={1} >Nam</Radio>
                                            <Radio value={0}>Nữ</Radio>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                                <Form.Item label="Số điện thoại" className={mapCss("mb-0")}>
                                    {getFieldDecorator('phoneNumber', {
                                        rules: [{ required: true, message: 'Hãy nhập vào số điện thoại!' }],
                                        initialValue: profile.phoneNumber
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                                <Form.Item label="Quốc tịch" className={mapCss("mb-0")}>
                                    {getFieldDecorator('nationality', {
                                        rules: [{ required: true, message: 'Hãy chọn quốc tịch!' }],
                                        initialValue: profile.nationality
                                    })(
                                        <Select
                                            showArrow
                                            showSearch
                                            placeholder="Chọn quốc tịch"
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().includes(input.toLowerCase())
                                            }
                                        >
                                            {countries.map(item => <Select.Option key={item.code} value={item.name}>{item.name}</Select.Option>)}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Địa chỉ" className={mapCss("mb-0")}>
                                    {getFieldDecorator('address', {
                                        initialValue: profile.address
                                    })(
                                        <Input.TextArea rows={5} />
                                    )}
                                </Form.Item>
                                <Form.Item className={mapCss("mb-0")}>
                                    <button className={mapCss("btn", "btn-success")} type="submit">Cập nhật</button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default Form.create({ name: 'frm' })(Right);