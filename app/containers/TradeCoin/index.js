import React, { Component } from 'react';
import { mapCss } from '../../libs/extensions';
import Parse from '../../parse/parseServer';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import Infomation from './components/infomation';
import PayType from './components/payType';
import Stores from '../../storeConfig/register';
import helperUI from '../../libs/helperUI';
import { ProductTypeEnum } from './commonEnum';
import { Select, Form, Input, InputNumber } from 'antd';
import Spinter from '../../components/Spinter';

@inject(Stores.PaymentStore)
@observer
class TradeCoin extends Component {
    @observable profile = {
        wallet: {

        }
    };

    @observable isWaiting = false;

    @observable productSelected = null;
    @observable paymentTypeSeleced = {};
    @observable coins = [];
    card = {
        cardNumber: '4929382115727754',
        cardExpiration: "02/2024",
        cardCcv: "881"
    }

    async fetchCoins() {
        const coins = await new Parse.Query('StoriiCoin')
            .equalTo('isDeleted', false)
            .find();
        this.coins = coins.map(coin => ({
            id: coin.id,
            name: coin.get('name'),
            value: coin.get('value'),
            price: coin.get('price'),
            oldPrice: coin.get('oldPrice')
        }));
    }

    async componentDidMount() {
        await this.fetchCoins();
        await this.fetchProfile();
    }

    async fetchProfile() {
        this.profile = await Parse.Cloud.run('fetchUserProfile');
    }

    onPaymentTypeSelected = paymentType => {
        this.paymentTypeSeleced = { ...paymentType };
    }

    onProductSecled = async value => {
        this.productSelected = await new Parse.Query('StoriiCoin').get(value);
    }

    onSubmit = event => {

        event.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                this.isWaiting = true;
                const errorCodes = [500, 101];
                const shoppingCart = {
                    cardInfo: values.cardInfo,
                    orderItems: [values.orderItem]
                };
                const rs = await Parse.Cloud.run('deposit', {
                    paymentType: this.paymentTypeSeleced.paymentTypeValue,
                    productType: ProductTypeEnum.StoriiCoin,
                    orderItems: shoppingCart.orderItems,
                    description: `Nạp ${this.productSelected.get('name')} (x${values.orderItem.quantity}) vào tài khoản`
                }).finally(() => this.isWaiting = false);

                if (!errorCodes.includes(rs.code)) {
                    helperUI.alertSuccess('Thanh toán thành công', 'Kiểm tra lại số dư trong ví');
                    return await this.fetchProfile();
                }
                return helperUI.alertError('Thanh toán không thành công', rs.message);


                //await this.payMediaContent();
            }
        });

    }

    payMediaContent = async () => {
        const rs = await Parse.Cloud.run('pay', {
            paymentType: this.paymentTypeSeleced.paymentTypeValue,
            productType: ProductTypeEnum.MediaContent,
            orderItems: [
                {
                    productId: '0Kr37rYYsx',
                    quantity: 1
                }
            ],
            description: `Mua bài hát Think About You`
        }).finally(() => this.isWaiting = false);
        const errorCodes = [500, 101];
        if (!errorCodes.includes(rs.code)) {
            helperUI.alertSuccess('Thanh toán thành công', 'Kiểm tra lại số dư trong ví');
            return await this.fetchProfile();
        }
        return helperUI.alertError('Thanh toán không thành công', rs.message);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 20 },
            },
        };
        return (
            <div className={mapCss('row', 'mt-4')}>
                <div className={mapCss('col-md-8')}>
                    <Form onSubmit={this.onSubmit} {...formItemLayout}>
                        <div className={mapCss("card", "border-info")}>
                            <div className={mapCss('card-header')}>
                                <h4 className={mapCss('m-b-0')}>Nạp xu vào ví</h4>
                            </div>
                            <div className={mapCss("card-body")}>
                                <p className={mapCss('text-danger')}>Xu dùng để mua và xem những nội dung được đăng tải trên Web và Storii App</p>
                                <Form.Item className={mapCss('form-group', 'mb-1')} label="Xu">
                                    {getFieldDecorator('orderItem.productId', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Chọn xu cần nạp!',
                                            }
                                        ],
                                    })(
                                        <Select placeholder="Chọn xu" showArrow onSelect={this.onProductSecled}>
                                            {
                                                this.coins.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item className={mapCss('form-group', 'mb-1')} label="Số lượng">
                                    {getFieldDecorator('orderItem.quantity', { initialValue: 1 })(
                                        <InputNumber min={1} className={mapCss('w-100')} />
                                    )}
                                </Form.Item>
                            </div>
                        </div>

                        <div className={mapCss("card")}>
                            <div className={mapCss('card-header')}>
                                <h4 className={mapCss('m-b-0')}>Chọn hình thức thanh toán</h4>
                            </div>
                            <div className={mapCss("card-body")}>
                                <PayType onPaymentTypeSelected={this.onPaymentTypeSelected} />
                            </div>
                        </div>
                        {
                            this.paymentTypeSeleced.paymentTypeValue && this.paymentTypeSeleced.paymentTypeValue === 1 && (
                                <div className={mapCss("card", "border-info", "mt-3")}>
                                    <div className={mapCss('card-header')}>
                                        <h4 className={mapCss('m-b-0')}>Nhập thông tin thẻ tín dụng</h4>
                                    </div>
                                    <div className={mapCss("card-body")}>
                                        <Form.Item className={mapCss('form-group', 'mb-1')} label="Mã số thẻ (Card number)">
                                            {getFieldDecorator('cardInfo.cardNumber', { initialValue: this.card.cardNumber })(
                                                <Input className={mapCss('w-100')} />
                                            )}
                                        </Form.Item>
                                        <Form.Item className={mapCss('form-group', 'mb-1')} label="Ngày hết hạn">
                                            {getFieldDecorator('cardInfo.cardExpiration', { initialValue: this.card.cardExpiration })(
                                                <Input className={mapCss('w-100')} />
                                            )}
                                        </Form.Item>
                                        <Form.Item className={mapCss('form-group', 'mb-1')} label="CCV">
                                            {getFieldDecorator('cardInfo.cardCcv', { initialValue: this.card.cardCcv })(
                                                <Input className={mapCss('w-100')} />
                                            )}
                                        </Form.Item>
                                        <div className={mapCss('form-group', 'mb-1', 'text-right')}>
                                            <button type="submit" className={mapCss('btn', 'btn-info')} disabled={this.isWaiting}> <Spinter spinning={this.isWaiting} /> Thanh toán</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </Form>
                </div>
                <div className={mapCss('col-md-4')}>
                    <div className={mapCss("card", "border-success")}>
                        <div className={mapCss('card-header')}>
                            <h4 className={mapCss('m-b-0')}>Thông tin ví</h4>
                        </div>
                        <div className={mapCss("card-body")}>
                            <p>Số dư :&nbsp;<span style={{ fontWeight: '500', color: 'red' }}>{(this.profile.wallet.balanceAmount || 0).toVND()} xu</span></p>
                        </div>
                    </div>
                    <div className={mapCss("card", "border-success", "mt-3")}>
                        <div className={mapCss('card-header')}>
                            <h4 className={mapCss('m-b-0')}>Bảng quy đổi</h4>
                        </div>
                        <div className={mapCss("card-body")}>
                            <Infomation />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Form.create({ name: 'frmPay' })(TradeCoin);