import React, { Component } from 'react';
import { mapCss, changeAlias } from '../../../libs/extensions';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import Store from '../../../storeConfig/register';
@inject(Store.AudioPlayerStore)
@observer
class Table extends Component {

    onPlay = (item) => {
        this.props.audioPlayerStore.fetchPlayList([item.id])
    }
    render() {
        const { datas } = this.props
        let rows = datas.map((data, index) => {

            return (

                <tr key={index}>
                    <td><a onClick={() => this.onPlay(data)} >{data.title}</a></td>
                    <td>{data.artists}</td>
                    <td>{data.price}</td>
                    {/* <td>
                        <a onClick={() => this.onPlay(data)} data-toggle="tooltip" data-original-title="Play"
                            className={mapCss("link")}> <i className={mapCss("fa", "fa-play")} /> </a>
                    </td> */}
                </tr >
            )
        });
        return (
                <div className={mapCss("table-responsive")}>
                    <table className={mapCss("table", "table-striped")}>
                        <thead className={mapCss("thead-inverse", "min-w")}>
                            <tr>
                                <th>Tiêu đề</th>
                                <th>Nghệ sĩ</th>
                                <th>Giá</th>
                                {/* <th className={mapCss("text-nowrap")}>Chơi nhạc</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
        );
    }
}

export default Table;