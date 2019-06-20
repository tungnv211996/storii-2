import React, { Component } from 'react';
import { mapCss, changeAlias } from '../../../libs/extensions';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Typography, Popover, Tooltip, Modal } from 'antd';
import Parse from '../../../parse/parseServer';
import { inject, observer } from 'mobx-react';
import Stores from '../../../storeConfig/register';

@inject(Stores.MediaContentStore)
@observer
class PlayListThumbnail extends Component {

  nagative = linkDetail => {
    this.props.history.push(linkDetail);
  };

  render() {
    const { infoPlayList } = this.props;
    const page = 'playlist/video';
    const linkDetail = `/${page}/${changeAlias(infoPlayList.get('title'))}/${infoPlayList.id}/${infoPlayList.get('mediaContents')[0].id}`;
    return (
      <div className={mapCss("col-lg-2", "col-md-6")}>
        <div className={mapCss("el-card-item")}>
          {infoPlayList ? <div onClick={() => this.nagative(linkDetail)}
            className={mapCss("el-card-avatar", "el-overlay-1")}
            style={{ backgroundImage: `url(${infoPlayList.get('mediaContents')[0].get('metadata').thumbnail})`, height: '17vh' }}>
            <div className={mapCss("el-overlay")}>
              <ul className={mapCss("el-info")}>
                <li>
                  <a style={{ padding: '10px 15px 10px 18px' }} className={mapCss("img-circle", "font-20")} href="javascript:void(0);">
                    <i className={mapCss("fa", "fa-play")} />
                  </a>
                </li>
              </ul>
            </div>
          </div> : null}
          <div className={mapCss("el-card-content", "text-left")}>
            <Tooltip title={infoPlayList.get('title')}>
              <h5 className={mapCss("m-b-0", "text-truncate")}>{infoPlayList.get('title')}</h5>
            </Tooltip>
            <div>
              <small className={mapCss("text-muted")}>{moment(infoPlayList.createdAt).fromNow()}</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PlayListThumbnail);