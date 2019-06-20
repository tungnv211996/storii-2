import React, { Component } from 'react';
import { mapCss } from '../../../libs/extensions';
import { observer } from 'mobx-react';
import AudioNextThumbnail from './nextThumbnail';
import PlayerAudio from './playerAudio';
import StreamChatBox from '../../../components/StreamChat/index';
import { observable } from 'mobx';
import Parse from '../../../parse/parseServer';

@observer
class AudioDetail extends Component {
    @observable liveStreaming = true;
    @observable id = this.props.match.params.id;
    fetchMediaById = async () => {
        const mediaContent = await new Parse.Cloud.run('getMediaContentById', {
            id: this.id
        })
        this.liveStreaming = mediaContent.liveStreaming;
    }

    componentDidMount = async () => {
        await this.fetchMediaById();

    }
    render() {
        return (
            <div >
                <div className={mapCss("row", "page-titles")}>
                    <div className={mapCss("col-md-5", "align-self-center")}>
                        <h4 className={mapCss("text-themecolor")}>Chi tiết </h4>
                    </div>
                    <div className={mapCss("col-md-7", "d-none", "d-sm-block", "align-self-center text-right")}>
                        <div className={mapCss("d-flex", "justify-content-end", "align-items-center")}>
                            <ol className={mapCss("breadcrumb")}>
                                <li className={mapCss("breadcrumb-item")}><a href="javascript:void(0)">Trang chủ</a></li>
                                <li className={mapCss("breadcrumb-item", "active")}>Chi tiết </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className={mapCss("row")}>
                    <PlayerAudio />
                    <AudioNextThumbnail />
                    <StreamChatBox />
                </div>

            </div>

        )
    }
}
export default AudioDetail;