import React, { Component } from 'react';
import { mapCss } from '../../libs/extensions';
import Parse from '../../parse/parseServer';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import Thumbnail from '../../components/Thumbnail/index';
import Loading from '../../components/Loading/index';
import { Spin, Skeleton } from 'antd';
import Spinter from '../../components/Spinter';
import Stores from '../../storeConfig/register';
import appConst from '../../libs/appConst';
import SkeletonCutomize from '../../components/Skeletion';
@inject(Stores.MediaContentStore)
@observer
class Videos extends Component {
  @observable infoVideo = [];
  @observable isSkeleton = false;
  @observable page = 1;
  @observable isLoadMore = true;
  async fetchVideos() {
    this.isSkeleton = true;
    await this.props.mediaContentStore.fetchMediaContents([1], this.page)
      .finally(() => this.isSkeleton = false);
    const mediaContents = this.props.mediaContentStore.medias;
    this.infoVideo = this.infoVideo.concat(mediaContents);
    if (mediaContents.length < appConst.defaultPageSize)
      this.isLoadMore = false;
  }
  loadMore = () => {
    this.page++;
    this.fetchVideos();
  }
  componentDidMount = async () => {
    await this.fetchVideos();
  }

  render() {
    let video = this.infoVideo.map((info, index) => {
      return (
        <Thumbnail
          infoMedia={info}
          key={info.id}
        />
      )
    });

    return (
      <div>
        <div className={mapCss("row", "page-titles")}>
          <div className={mapCss("col-md-5", "align-self-center")}>
            <h4 className={mapCss("text-themecolor")}>ST-TUBE</h4>
          </div>
          <div className={mapCss("col-md-7", "d-none", "d-sm-block", "align-self-center", "text-right")}>
            <div className={mapCss("d-flex", "justify-content-end", "align-items-center")}>
              <ol className={mapCss("breadcrumb", "p-r-15")}>
                <li className={mapCss("breadcrumb-item")}><a href="javascript:void(0)">Trang chủ</a></li>
                <li className={mapCss("breadcrumb-item", "active")}>ST-TUBE</li>
              </ol>
            </div>
          </div>
        </div>
        <div className={mapCss("row", "el-element-overlay")}>
          <div className={mapCss("col-md-12")}>
            <div className={mapCss("card")}>
              <div className={mapCss("card-body")}>
                <h5 className={mapCss("card-title", "m-0")}>ST-TUBE</h5>
                <div hidden={!this.isSkeleton}>
                  <SkeletonCutomize pageSize={appConst.defaultPageSize} />
                </div>
                <div className={mapCss("row")}>
                  {video}
                </div >
                {this.isLoadMore ? <div onClick={this.loadMore} style={{ textAlign: 'center' }}>
                  <a className={mapCss("btn", "btn-primary")} href="javascript:void()">Xem thêm</a></div> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Videos;