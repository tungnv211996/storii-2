import React, { Component } from 'react';
import { mapCss } from '../../../libs/extensions';
import { Link, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import Parse from '../../../parse/parseServer';
import { changeAlias } from '../../../libs/extensions';
import Loading from '../../../components/Loading/index';
import { Typography, Tooltip } from 'antd';
import Stores from '../../../storeConfig/register';
@inject(Stores.MediaContentStore)
@observer
class NextThumbnail extends Component {
    @observable infoVideos = [];
    @observable flat = false;
    @observable preId = this.props.match.params.id;

    componentDidMount = async () => {
        this.flat = true;
        await this.props.mediaContentStore.fetchMediaContents([1])
        this.flat = false;
    }

    nagative = async (infoVideo) => {
        await this.props.mediaContentStore.fetchMediaById(infoVideo.id);
        await this.props.mediaContentStore.fetchMediaContents([1])
        this.props.history.push(`/video-detail/${changeAlias(infoVideo.title)}/${infoVideo.id}`);
        this.preId = this.props.match.params.id;
    }
    render() {
        const { Paragraph } = Typography;
        const infoVideos = this.props.mediaContentStore.medias
        const { liveStreaming } = this.props.mediaContentStore.media;
        let isFirst = false;
        let thumbnail = infoVideos.map((infoVideo, index) => {
            if (infoVideo.id !== this.preId)
                return (
                    <div className={mapCss("card-body")} key={index}>
                        {index == 0 || (index == 1 && isFirst == true) ? <h5 className={mapCss("card-title")}>Tiếp theo</h5> : null}
                        <a onClick={() => this.nagative(infoVideo)}>
                            <div className={mapCss("row", "m-b-20")}>
                                <div className={mapCss("col-4")}><img src={infoVideo.metadata.thumbnail} className={mapCss("img-fluid")} alt="alb" /></div>
                                <div className={mapCss("col-8")}>
                                    <Tooltip title={infoVideo.title}>
                                        <h5 className={mapCss("card-title", "m-b-5")}>
                                            <Paragraph ellipsis={{ rows: 1, expandable: false }}>{infoVideo.title}</Paragraph></h5>
                                    </Tooltip>
                                    <div className={mapCss("text-muted")}>{infoVideo.creator.fullname}</div>
                                    <div className={mapCss("text-muted")}>{infoVideo.view_count} lượt xem</div>
                                </div>
                            </div>
                        </a>
                        {index == 0 || (index == 1 && isFirst == true) ? <hr /> : null}
                    </div>
                )
            else {
                if (index == 0) isFirst = true
            }
        })
        if (!liveStreaming)
            return (
                <div className={mapCss("col-lg-4")}>
                    <div className={mapCss("card")}>
                        {thumbnail}
                    </div>
                </div>
            )
        else return (<div>{}</div>)

    }
}
export default withRouter(NextThumbnail);