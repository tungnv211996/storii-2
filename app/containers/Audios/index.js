import React, { Component } from 'react';
import { mapCss } from '../../libs/extensions';
import Parse from '../../parse/parseServer';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import Thumbnail from '../../components/Thumbnail/index';
import Loading from '../../components/Loading/index';
import { mediaContentType } from '../../libs/commonEnum';
import { Spin, Skeleton } from 'antd';
import Stores from '../../storeConfig/register';
import appConst from '../../libs/appConst';
import SkeletonCutomize from '../../components/Skeletion/index';

@inject(Stores.MediaContentStore)
@observer
class Audios extends Component {
  @observable id = '';
  @observable infoAudios = [];
  @observable infoAlbums = [];
  @observable isSkeleton = false;
  @observable pageAudio = 1;
  @observable pageAlbum = 1;
  @observable mediaContents = [];
  @observable isLoadMoreAudio = true;
  @observable isLoadMoreAlbum = true;

  async fetchAudioConent() {
    this.isSkeleton = true;
    const result = await Parse.Cloud.run('fetchMediaContent', { contentTypes: [2], page: this.pageAudio, pageSize: appConst.defaultPageSize })
      .finally(() => { this.isSkeleton = false });
    this.infoAudios = this.infoAudios.concat(result);
    if (result.length < appConst.defaultPageSize) {
      this.isLoadMoreAudio = false;
    }
  }

  async fetchAlbumConent() {
    this.isSkeleton = true;
    const result = await Parse.Cloud.run('fetchMediaContent', { contentTypes: [3], page: this.pageAlbum, pageSize: appConst.defaultPageSize })
      .finally(() => { this.isSkeleton = false });
    this.infoAlbums = this.infoAlbums.concat(result);
    if (result.length < appConst.defaultPageSize)
      this.isLoadMoreAlbum = false;
  }

  loadMoreAlbum = () => {
    this.pageAlbum++;
    this.fetchAlbumConent()
  }

  loadMoreAudio = () => {
    this.pageAudio++;
    this.fetchAudioConent()
  }

  componentDidMount = () => {
    this.fetchAudioConent()
    this.fetchAlbumConent()
  }

  render() {
    const audio = this.infoAudios.filter(item => item.contentType === mediaContentType.Music)
      .map((info, index) => {
        return (
          <Thumbnail
            infoMedia={info}
            key={info.id}
          />
        )
      });
    const album = this.infoAlbums.filter(item => item.contentType === mediaContentType.AlbumMusic)
      .map((info, index) => {
        return (
          <Thumbnail
            infoMedia={info}
            key={info.id}
          />
        )
      });

    return (
      <>
        <div className={mapCss("row", "page-titles")}>
          <div className={mapCss("col-md-5", "col-5", "col-sm-5", "align-self-center")}>
            <h4 className={mapCss("text-themecolor")}>ST-SOUND</h4>
          </div>
          <div className={mapCss("col-md-7", "d-none", "d-sm-block", "align-self-center", "text-right")}>
            <div className={mapCss("d-flex", "justify-content-end", "align-items-center")}>
              <ol className={mapCss("breadcrumb")}>
                <li className={mapCss("breadcrumb-item")}><a href="javascript:void(0)">Trang chủ</a></li>
                <li className={mapCss("breadcrumb-item", "active")}>ST-SOUND</li>
              </ol>
            </div>
          </div>
        </div>
        <div>
          <div className={mapCss("row", "el-element-overlay")}>
            <div className={mapCss("col-md-12")}>
              <div className={mapCss("card")}>
                <div className={mapCss("card-body")}>
                  <h5 className={mapCss("card-title", "m-0")}>ST-SOUND</h5>
                  <div hidden={!this.isSkeleton}>
                    <SkeletonCutomize pageSize={appConst.defaultPageSize}></SkeletonCutomize>
                  </div>
                  <div className={mapCss("row")}> {audio} </div>
                  {this.isLoadMoreAudio ? <div style={{ textAlign: 'center' }} onClick={this.loadMoreAudio}>
                    <a className={mapCss("btn", "btn-primary")} href="javascript:void()">Xem thêm</a></div> : null}
                </div>
              </div>
            </div>
          </div>
          <div className={mapCss("row", "el-element-overlay")}>
            <div className={mapCss("col-md-12")}>
              <div className={mapCss("card")}>
                <div className={mapCss("card-body")}>
                  <h5 className={mapCss("card-title", "m-0")}>ALBUM</h5>
                  <div hidden={!this.isSkeleton} >
                    <SkeletonCutomize pageSize={appConst.defaultPageSize}></SkeletonCutomize>
                  </div>
                  <div className={mapCss("row")}>
                    {album}
                  </div >
                  {this.isLoadMoreAlbum ? <div style={{ textAlign: 'center' }} onClick={this.loadMoreAlbum}>
                    <a className={mapCss("btn", "btn-primary")} href="javascript:void()">Xem thêm</a></div> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default withRouter(Audios);