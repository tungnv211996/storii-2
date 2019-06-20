import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { observer } from 'mobx-react';
import Parse from '../../../parse/parseServer';
import { mapCss } from '../../../libs/extensions';
import PropTypes from 'prop-types';
import classNames from 'classnames';

@observer
class PayType extends Component {
    @observable paymentTypes = [];
    @observable selected = null;

    async componentDidMount() {
        this.paymentTypes = (await new Parse.Query('PaymentType').find().catch(() => []))
            .map(paymentType => ({
                id: paymentType.id,
                name: paymentType.get('name'),
                description: paymentType.get('description'),
                logo: paymentType.get('logo'),
                paymentTypeValue: paymentType.get('value')
            }));
    }

    render() {
        return (
            <div className={mapCss('row')}>
                {this.paymentTypes.map(paymentType => (
                    <div className={mapCss('col')} key={paymentType.id}>
                        <div className={classNames(mapCss('payment_type_card'), {
                            [mapCss('payment_selected')]: this.selected === paymentType
                        })} onClick={() => {
                            const selectedItem = toJS(paymentType);
                            this.selected = paymentType;
                            this.props.onPaymentTypeSelected(selectedItem);
                        }}>
                            <div className={("payment_type")} style={{
                                backgroundImage: `url(${paymentType.logo})`,
                                height: 100,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                            }}>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

PayType.propTypes = {
    onPaymentTypeSelected: PropTypes.func
};

PayType.defaultProps = {
    onPaymentTypeSelected: () => { },
}

export default PayType; 