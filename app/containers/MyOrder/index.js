import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Parse from '../../parse/parseServer';
import { mapCss } from '../../libs/extensions';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';
import numeral from 'numeral';

@observer
class MyOrder extends Component {
    @observable orders = [];

    async componentDidMount() {
        this.orders = await Parse.Cloud.run('fetchOrders');
    }

    render() {
        return (
            <div className={mapCss('card', 'mt-4')}>
                <div className={mapCss('card-body')}>
                    <h4 className={mapCss("card-title")}>Đơn hàng của tôi</h4>
                    <div className={mapCss('row')}>
                        <div className={mapCss('col-md-12')}>
                            <div className={mapCss("table-responsive")}>
                                <table className={mapCss("table")}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Mã đơn hàng</th>
                                            <th>Ngày mua</th>
                                            <th>Ghi chú</th>
                                            <th>Tổng tiền</th>
                                            <th>Trạng thái đơn hàng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.orders.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td><label className={mapCss('text-info', 'font-weight-bold')}>{item.orderCode}</label></td>
                                                    <td>{moment(item.orderDate).format('DD/MM/YYYY')}</td>
                                                    <td>{item.description}</td>
                                                    <td>{numeral(item.total).format()} {item.unit}</td>
                                                    <td><span className={mapCss('label', 'label-success')}>{item.status}</span> </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MyOrder);