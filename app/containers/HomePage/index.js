import React from 'react';
import Parse from '../../parse/parseServer';
import _ from 'lodash';
import { mapCss } from '../../libs/extensions';
import Suggestion from './components/suggestion';

export default class HomePage extends React.Component {
    push = async () => {
        Parse.Cloud.run('push', {
            chanels: ['C2503iC7NH'],
            message: 'Hello'
        }).then(data => console.log(data))
    }

    render() {
        return (
            <React.Fragment>
                <div className={mapCss("row", "page-titles")}>
                    <div className={mapCss("col-md-5", "align-self-center")}>
                        <h4 className={mapCss("text-themecolor")}>Trang chủ</h4>
                    </div>
                </div>
                <div>
                    <div className={mapCss("row", "el-element-overlay")}>
                        <div className={mapCss("col-md-12")}>
                            <div className={mapCss("card")}>
                                <div className={mapCss("card-body")}>
                                    <h5 className={mapCss("card-title", "m-0")}>ĐỀ XUẤT</h5>
                                    <Suggestion />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <button className={mapCss('btn', 'btn-dark')} onClick={this.push}>PUSH</button> */}
            </React.Fragment>
        );
    }
}
