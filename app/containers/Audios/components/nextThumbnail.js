import React, { Component } from 'react';
import { mapCss } from '../../../libs/extensions';
import { Link, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import Parse from '../../../parse/parseServer';
import { changeAlias } from '../../../libs/extensions';
import Loading from '../../../components/Loading/index';
import { Typography, Tooltip } from 'antd';
import moment from 'moment';
import Stores from '../../../storeConfig/register';
@inject(Stores.MediaContentStore)
@observer
class AudioNextThumbnail extends Component {
    @observable infoAudios = [];
    @observable flat = false;
    @observable preId = this.props.match.params.id;

    componentDidMount = async () => {
        this.flat = true;
        await this.props.mediaContentStore.fetchMediaContents([2])
        this.flat = false;
    }

    nagative = async (infoAudio) => {
        await this.props.mediaContentStore.fetchMediaById(infoAudio.id);
        await this.props.mediaContentStore.fetchMediaContents([2])
        this.props.history.push(`/audio-detail/${changeAlias(infoAudio.title)}/${infoAudio.id}`);
        this.preId = this.props.match.params.id;
    }

    render() {
        const infoAudios = this.props.mediaContentStore.medias;
        const { Paragraph } = Typography;
        const { liveStreaming } = this.props.mediaContentStore.media;
        let isFirst = false;
        let thumbnail = infoAudios.map((infoAudio, index) => {
            if (infoAudio.id !== this.preId)
                return (
                    <div className={mapCss("card-body")} key={index}>
                        {index == 0 || (index == 1 && isFirst == true) ? <h5 className={mapCss("card-title")}>Tiếp theo</h5> : null}
                        <a onClick={() => this.nagative(infoAudio)}>
                            <div className={mapCss("row", "m-b-20")}>
                                <div className={mapCss("col-4")}>
                                    <div className={mapCss("thumbnail-img")} style={{ backgroundImage: `url(${infoAudio.metadata.thumbnail})`, height: '17vh' }}></div>
                                </div>
                                <div className={mapCss("col-8")}>
                                    <Tooltip title={infoAudio.title}>
                                        <h5 className={mapCss("card-title", "m-b-5")}>
                                            <Paragraph ellipsis={{ rows: 1, expandable: false }}>{infoAudio.title}</Paragraph></h5>
                                    </Tooltip>
                                    <div className={mapCss("text-muted")}>{infoAudio.creator.fullname}</div>
                                    <div className={mapCss("text-muted")}>{infoAudio.view_count} lượt nghe</div>
                                </div>
                            </div>
                        </a>

                        {index == 0 || (index == 1 && isFirst == true) ? <hr /> : null}

                    </div >

                )
            else {
                if (index == 0) isFirst = true
            }
        })
        if (!liveStreaming)
            return (
                <div className={mapCss("col-lg-4")} >
                    <div className={mapCss("card")}>
                        {thumbnail}
                    </div>
                </div>
            ); else
            return <div>{}</div>
    }
}
export default withRouter(AudioNextThumbnail);