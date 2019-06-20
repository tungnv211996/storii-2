import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Stores from '../../storeConfig/register';
import { mapCss } from '../../libs/extensions';
import PlayListThumbnail from './components/thumbnail';
@inject(Stores.PlayListStore, Stores.MediaContentStore)
@observer
class PlayList extends Component {
  createPlayList = async () => {
    await this.props.mediaContentStore.fetchMediaContents([1, 2], 1, 5)
    this.props.playListStore.createPlayList('test', this.props.mediaContentStore.medias)
  }
  addMediaToplayList = async () => {
    // await this.props.mediaContentStore.fetchMediaById('XYlLvmnlXd')
    this.props.playListStore.addMediaToplayList('XYlLvmnlXd', 'O9OHtnIqIf')
  }
  componentDidMount = async () => {
    await this.props.playListStore.fetchPlayLists()
  }
  render() {
    const { playLists } = this.props.playListStore;
    let thumbnail = playLists.map((playList, index) => {
      return (<PlayListThumbnail
        infoPlayList={playList} key={index}
      ></PlayListThumbnail>)
    })
    return (
      <div>
        <div className={mapCss("row", "page-titles")}>
          <div className={mapCss("col-md-5", "align-self-center")}>
            <h4 className={mapCss("text-themecolor")}>PLAYLIST</h4>
          </div>
          <div className={mapCss("col-md-7", "d-none", "d-sm-block", "align-self-center", "text-right")}>
            <div className={mapCss("d-flex", "justify-content-end", "align-items-center")}>
              <ol className={mapCss("breadcrumb", "p-r-15")}>
                <li className={mapCss("breadcrumb-item")}><a href="javascript:void(0)">Trang chủ</a></li>
                <li className={mapCss("breadcrumb-item", "active")}>PLAYLIST</li>
              </ol>
              {/* <button type="button" className={mapCss("btn", "btn-info", "d-none", "d-lg-block", "m-l-15")}>
                <i className={mapCss("fa", "fa-plus-circle")} />Tạo playlist</button> */}
            </div>
          </div>
        </div>
        <div className={mapCss("row", "el-element-overlay")}>
          <div className={mapCss("col-md-12")}>
            <div className={mapCss("card")}>
              <div className={mapCss("card-body")}>
                {thumbnail}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PlayList;