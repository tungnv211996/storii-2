import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { mapCss } from '../../../libs/extensions';
import Parse from '../../../parse/parseServer';

@observer
class Infomation extends Component {
    @observable coins = [];

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

    componentDidMount() {
        this.fetchCoins();
    }

    render() {
        return (
            <div className={mapCss("table-responsive")}>
                <table className={mapCss("table")}>
                    <thead>
                        <tr>
                            <th>Xu</th>
                            <th>Mệnh giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.coins.map((coin, index) => {
                                return (
                                    <tr key={index * 123}>
                                        <td>{coin.name}</td>
                                        <td>{coin.price.toVNDCurrency()}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Infomation; 