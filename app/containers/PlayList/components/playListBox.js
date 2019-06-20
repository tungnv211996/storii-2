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
@inject(Stores.MediaContentStore, Stores.PlayListStore)
@observer
class PlayListBox extends Component {
  @observable flat = false;
  @observable playListId = '';

  @observable playListTitle = '';
  @observable mediaContents = [];

  componentDidMount = async () => {
    this.flat = true;
    this.playListId = this.props.match.params.playListId;
    await this.props.playListStore.fetchPlayListById(this.playListId)
    this.playListTitle = this.props.playListStore.playList.get('title')
    this.mediaContents = this.props.playListStore.playList.get('mediaContents')
    this.flat = false;
  }

  nagative = async (infoMedia) => {
    await this.props.mediaContentStore.fetchMediaById(infoMedia.id);
    this.mediaContents = this.props.playListStore.playList.get('mediaContents')
    this.props.history.push(`/playlist/video/${changeAlias(this.playListTitle)}/${this.playListId}/${infoMedia.id}`);
  }
  render() {
    const { Paragraph } = Typography;
    console.log(this.props.playListStore.playList);
    const infoMedias = this.mediaContents
    const { liveStreaming } = this.props.mediaContentStore.media;
    let thumbnail = infoMedias.map((infoMedia, index) => {
      return (
        <div className={mapCss("card-body")} key={index} style={{ paddingTop: "0px", paddingBottom: "0px" }}>
          <a onClick={() => this.nagative(infoMedia)}>
            <div className={mapCss("row", "m-b-20")}>
              <div className={mapCss("col-4")}><img src={infoMedia.get('metadata').thumbnail} className={mapCss("img-fluid")} alt="alb" /></div>
              <div className={mapCss("col-8")}>
                <Tooltip title={infoMedia.get('title')}>
                  <h5 className={mapCss("card-title")} style={{ height: '2em' }}>
                    <Paragraph ellipsis={{ rows: 1, expandable: false }}>{infoMedia.get('title')}</Paragraph></h5>
                </Tooltip>
                <div className={mapCss("text-muted")}>{infoMedia.get('creator').get('fullname')}</div>
              </div>
            </div>
          </a>
        </div>
      )

    })
    if (!liveStreaming)
      return (
        <div className={mapCss("col-lg-4")}>
          <div className={mapCss("card")}>
            <div className={mapCss('card-body')}>
              <h6 className={mapCss('card-title')}>{this.playListTitle}</h6>
            </div>
            <div style={{ overflow: 'auto', height: '50vh' }}>
              {thumbnail}
            </div>
          </div>
        </div>
      )
    else return (<div>{}</div>)

  }
}
export default withRouter(PlayListBox);