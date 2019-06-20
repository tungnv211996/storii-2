import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Parse from '../../../parse/parseServer';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { mapCss, changeAlias } from '../../../libs/extensions';
import Comments from '../../../components/Comment/index';
import ReactPlayer from 'react-player';
import Loading from '../../../components/Loading/index';
import { Typography } from 'antd';
import Stores from '../../../storeConfig/register';
import moment from 'moment';
@inject(Stores.MediaContentStore)
@observer
class PlayerAudio extends Component {
    @observable id = this.props.match.params.id;
    @observable isSubscribed = false;
    @observable likeCount = null;
    @observable isLiked = false;
    @observable flat = false;

    likeAudio = async (mediaContentId) => {
        if (this.isLiked == false) {
            const result = (await Parse.Cloud.run('likeMediaContent', {
                mediaContentId: mediaContentId
            }));
            this.isLiked = result.isLiked;
            this.likeCount = result.like_count;

        } else {
            const result = (await Parse.Cloud.run('dislikeMediaContent', {
                mediaContentId: mediaContentId
            }));
            this.isLiked = result.isLiked;
            this.likeCount = result.like_count;
        }
    }

    componentDidMount = async () => {
        this.flat = true;
        await this.props.mediaContentStore.fetchMediaById(this.id)
        this.isSubscribed = this.props.mediaContentStore.media.creator.isSubscribed;
        this.isLiked = this.props.mediaContentStore.media.isLiked;
        this.flat = false;
    }

    increaseView = () => {
        const mediaContent = new Parse.Object('MediaContent')
        mediaContent.id = this.id
        new Parse.Object('ViewHistory')
            .save({
                viewer: Parse.User.current(),
                mediaContent
            });

    }
    onProgress = item => {
        if (item.playedSeconds > 15 && item.playedSeconds < 16) {
            this.increaseView()
        }
    }
    subscribeAudio = async (userId) => {
        const res = await Parse.Cloud.run('subscribe', {
            chanelId: userId,
        });
        this.isSubscribed = res.isSubscribed;
    }
    unSubscribeAudio = async (userId) => {
        const res = await Parse.Cloud.run('unsubscribe', {
            chanelId: userId,
        });
        this.isSubscribed = res.isSubscribed;
    }
    nagative = linkDetail => {
        this.props.history.push(linkDetail)
    }
    render() {
        const { Paragraph } = Typography
        const { liveStreaming } = this.props;
        const detailAudio = this.props.mediaContentStore.media;
        const linkDetail = "/chanel/" + changeAlias(detailAudio.creator ? detailAudio.creator.fullname : '')
            + "/" + (detailAudio.creator ? detailAudio.creator.id : '');
        const avatar = detailAudio.creator ? detailAudio.creator.avatar : null
        const creatorId = detailAudio.creator ? detailAudio.creator.id : ''
        return (
            <div className={mapCss("col-lg-8")}>
                <div className={mapCss("card")}>
                    <div className={mapCss("card-body")}>
                        <Loading flat={this.flat} />
                        {liveStreaming && !this.flat ?
                            <span style={{ position: 'absolute', top: "4%", backgroundColor: 'red', left: '35px' }}
                                className={mapCss("badge", "badge-danger", "text-uppercase")}>
                                Trực tiếp
                            </span>
                            : null}
                        {detailAudio.source.url != '' ? <ReactPlayer
                            style={{
                                backgroundImage: `url(${detailAudio.metadata.thumbnail})`, width: '100%', display: 'table-cell',
                                backgroundPosition: 'center center', backgroundRepeat: 'no-repeat'
                            }}
                            controls
                            playing
                            onProgress={this.onProgress}
                            url={detailAudio.source.url}
                        /> : null}

                        <h3 className={mapCss("card-title", "m-t-30")}>{detailAudio.title}</h3>
                        <div className={mapCss('row', 'card-body', 'p-t-0', 'p-b-0')}>
                            <div className={mapCss("d-inline-flex")} style={{ width: '100%' }}>
                                <span className={mapCss("vd-view")}>{detailAudio.view_count} Lượt xem</span>
                                <div className={mapCss("ml-auto")}>
                                    <ul className={mapCss("list-inline", "m-b-0")}>
                                        {creatorId !== Parse.User.current().id ? <li className={mapCss("cursor-pointer")} onClick={() => this.likeAudio(detailAudio.id)}>
                                            {this.isLiked ? <i className={mapCss("fa", "fa-thumbs-up", "icon-like", "fa-2x")} />
                                                : <i className={mapCss("fa", "fa-thumbs-up", "fa-2x")} />} {this.likeCount ? this.likeCount : detailAudio.like_count}</li> : null}
                                        <li><i className={mapCss("fa", "fa-comment", "fa-2x")} /> {detailAudio.comment_count}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className={mapCss('m-t-0', 'm-b-0')} />
                    <div className={mapCss('card-body')}>
                        <div className={mapCss('d-inline-flex')} style={{ width: '100%' }}>
                            <a className={mapCss('d-inline-flex')} onClick={() => this.nagative(linkDetail)}>
                                <div className={mapCss('profile-pic', 'text-bold', 'card-body')}>
                                    <img src={avatar || require('../../../assets/images/user.png')} alt='user-img'
                                        style={{ height: 40, width: 40 }} className={mapCss('img-circle')} />
                                </div>
                                <div className={mapCss('m-t-15')}>
                                    <div style={{ fontWeight: 'bold' }}>{detailAudio.creator ? detailAudio.creator.fullname : null}</div>
                                    <div>Xuất bản {moment(detailAudio.createdAt).format('DD/MM/YYYY')}</div>
                                </div>
                            </a>
                            <div className={mapCss('m-t-15', 'ml-auto')}>
                                {creatorId !== Parse.User.current().id ? <a>
                                    {!this.isSubscribed ? <span onClick={() => this.subscribeAudio(detailAudio.creator.id)}
                                        className={mapCss('btn', 'btn-primary')}>ĐĂNG KÝ</span> :
                                        <span onClick={() => this.unSubscribeAudio(detailAudio.creator.id)}
                                            className={mapCss('btn', 'btn-secondary')}>HỦY ĐĂNG KÝ
                                        </span>
                                    }
                                </a> : null}
                            </div>
                        </div>
                        <Paragraph ellipsis={{ rows: 3, expandable: true, }} className={mapCss('m-t-40')} >
                            {detailAudio.metadata.shortDescription}
                        </Paragraph>
                    </div>
                    {!this.flat && !liveStreaming ? <div className={mapCss("card-body")}>
                        <hr className={mapCss("m-t-0")} />
                        <Comments />
                    </div> : null}
                </div>
            </div>
        )
    }
}

export default withRouter(PlayerAudio);