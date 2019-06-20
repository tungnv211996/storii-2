import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Parse from '../../../parse/parseServer';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import { mapCss, changeAlias } from '../../../libs/extensions';
import Comments from '../../../components/Comment/index'
import ReactPlayer from 'react-player';
import Loading from '../../../components/Loading/index';
import { Typography } from 'antd';
import Stores from '../../../storeConfig/register';
import moment from 'moment';
import appConst from '../../../libs/appConst';

@inject(Stores.MediaContentStore, Stores.StreamChatStores)
@observer
class PlayerVideo extends Component {
  @observable id = this.props.match.params.id;
  @observable detailVideo = null;
  @observable flat = false;
  @observable isSubscribed = false;
  @observable isLiked = false;
  @observable likeCount = null;

  likeVideo = async (mediaContentId) => {
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

  subscribeVideo = async (userId) => {
    const res = await Parse.Cloud.run('subscribe', {
      chanelId: userId,
    });
    this.isSubscribed = res.isSubscribed;
  }

  unSubscribeVideo = async (userId) => {
    const res = await Parse.Cloud.run('unsubscribe', {
      chanelId: userId,
    });
    this.isSubscribed = res.isSubscribed;
  }

  componentDidMount = async () => {
    this.flat = true;
    await this.props.mediaContentStore.fetchMediaById(this.id);
    this.isSubscribed = this.props.mediaContentStore.media.creator.isSubscribed
    this.isLiked = this.props.mediaContentStore.media.isLiked
    this.flat = false;
  }

  subscribeVideo = async (userId) => {
    const res = await Parse.Cloud.run('subscribe', {
      chanelId: userId,
    });
    this.isSubscribed = res.isSubscribed;
  }

  unSubscribeVideo = async (userId) => {
    const res = await Parse.Cloud.run('unsubscribe', {
      chanelId: userId,
    });
    this.isSubscribed = res.isSubscribed;
  }

  onProgress = item => {
    if (item.playedSeconds > 15 && item.playedSeconds < 16) {
      this.increaseView()
    }
  }

  nagative = linkDetail => {
    this.props.history.push(linkDetail)
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

  nagative = linkDetail => {
    this.props.history.push(linkDetail)
  }
  shareFb = (linkShare) => {
    window.open(linkShare, 'name', 'width=600,height=600')
    this.props.mediaContentStore.updateMetaPage();
  }
  render() {
    const { concurrentViewer } = this.props.streamChatStores;
    const detailVideo = this.props.mediaContentStore.media;
    const url = detailVideo ? detailVideo.source ? detailVideo.source.url : null : null;
    const liveStreaming = detailVideo ? detailVideo.liveStreaming : false;
    const creator = detailVideo ? detailVideo.creator : null;
    const linkDetail = "/chanel/" + changeAlias(creator ? creator.fullname : '')
      + "/" + (creator ? creator.id : '');
    const avatar = creator ? creator.avatar : null;
    const { Paragraph } = Typography;
    ReactPlayer.canPlay(url);
    const creatorId = creator ? creator.id : ''
    const linkShare = `https://www.facebook.com/sharer/sharer.php?u=${appConst.homePage}${this.props.history.location.pathname}`;
    return (
      <div className={mapCss('col-lg-8')}>
        <div className={mapCss('card')}>
          <div className={mapCss('card-body')}>
            <Loading flat={this.flat} />
            {liveStreaming && !this.flat ?
              <span style={{ position: 'absolute', top: "45%", backgroundColor: 'red', left: '35px' }}
                className={mapCss("badge", "badge-danger", "text-uppercase")}>
                Trực tiếp
              </span>
              : null}
            {url ? <ReactPlayer
              width="100%"
              height="500px"
              url={url}
              playing
              controls
              onProgress={this.onProgress}
            /> : null}
            <h3 className={mapCss('card-title', 'm-t-30')}>{detailVideo ? detailVideo.title : null}</h3>
            <div className={mapCss('row', 'card-body', 'p-t-0', 'p-b-0')}>
              <div className={mapCss('d-inline-flex')} style={{ width: '100%' }} >
                <span className={mapCss('vd-view')}>
                  {detailVideo ? detailVideo.view_count : null} lượt xem
                  <br />
                  Đang xem: {concurrentViewer}
                </span>
                <div className={mapCss('ml-auto', 'text-right')}>
                  <ul className={mapCss('list-inline', 'm-b-0')}>
                    <li className={mapCss('fb-share-button')} data-layout="button" data-size="small">
                      <a style={{ color: '#595959' }} className={mapCss('fa', 'fa-share-alt', 'fa-2x')}
                        onClick={() => this.shareFb(linkShare)}
                      >
                      </a>
                    </li>
                    <li className={mapCss('cursor-pointer')} onClick={() => this.likeVideo(detailVideo.id)}>
                      {this.isLiked ? <i className={mapCss('fa', 'fa-thumbs-up', 'icon-like', 'fa-2x')} />
                        : <i className={mapCss('fa', 'fa-thumbs-up', 'fa-2x')} />} {this.likeCount ? this.likeCount : detailVideo ? detailVideo.like_count : null}</li>
                    <li><i className={mapCss('fa', 'fa-comment', 'fa-2x')} /> {detailVideo ? detailVideo.comment_count : null}</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
          <hr className={mapCss('m-b-0', 'm-t-0')} />
          <div className={mapCss('card-body')}>
            <div className={mapCss('d-inline-flex')} style={{ width: '100%' }}>
              <a className={mapCss('d-inline-flex')} onClick={() => this.nagative(linkDetail)}>
                <div className={mapCss('profile-pic', 'text-bold', 'card-body')}>
                  <img src={avatar || require('../../../assets/images/user.png')} alt='user-img'
                    style={{ height: 40, width: 40 }} className={mapCss('img-circle')} />
                </div>
                <div className={mapCss('m-t-15')}>
                  <div style={{ fontWeight: 'bold' }} >{creator ? creator.fullname : null}</div>
                  <div>Xuất bản {moment(detailVideo ? detailVideo.createdAt : null).format('DD/MM/YYYY')}</div>
                </div>
              </a>
              <div className={mapCss('ml-auto', 'm-t-15')}>
                {creatorId !== Parse.User.current().id ? <a >
                  {!this.isSubscribed ? <span onClick={() => this.subscribeVideo(creator.id)}
                    className={mapCss('btn', 'btn-primary')}>ĐĂNG KÝ</span> :
                    <span onClick={() => this.unSubscribeVideo(creator.id)}
                      className={mapCss('btn', 'btn-secondary')}>HỦY ĐĂNG KÝ</span>}
                </a> : null}
              </div>
            </div>

          </div>
          <Paragraph ellipsis={{ rows: 3, expandable: true }} style={{ marginLeft: '60px', marginRight: '60px' }}>
            {detailVideo ? detailVideo.metadata ? detailVideo.metadata.shortDescription : null : null}
          </Paragraph>
          {!this.flat && !liveStreaming ? <div className={mapCss('card-body')}>
            <hr className={mapCss("m-t-0")} />
            <Comments />
          </div> : null}
        </div>
      </div>
    )
  }
}

export default withRouter(PlayerVideo);