import React, { Component } from 'react';
import Parse from '../../parse/parseServer';
import { mapCss } from '../../libs/extensions';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import PostThumbnail from './components/thumbnail';
import { Skeleton, Avatar } from 'antd';

@observer
class Post extends Component {
  @observable posts = [];
  @observable isLoading = false;
  fetchPosts = async () => {
    this.isLoading = true;
    const result = await new Parse.Query('Post')
      .include('author')
      .equalTo('isPublished', true)
      .find({ useMasterKey: true })
      .finally(() => { this.isLoading = false });
    this.posts = result
  }
  componentDidMount = async () => {
    await this.fetchPosts();
  }
  render() {
    let posts = this.posts.map((post, index) => {
      return (
        <PostThumbnail infoPost={post} key={index} />
      )
    })
    let skeleton = [];
    for (let i = 0; i < this.posts.length; i++) {
      skeleton.push(
        <Skeleton loading title active key={i}>
        </Skeleton>
      )
    }
    return (
      <div>
        <div className={mapCss("row", "page-titles")}>
          <div className={mapCss("col-md-5", "align-self-center")}>
            <h4 className={mapCss("text-themecolor")}>BÀI VIẾT</h4>
          </div>
          <div className={mapCss("col-md-7", "d-none", "d-sm-block", "align-self-center", "text-right")}>
            <div className={mapCss("d-flex", "justify-content-end", "align-items-center")}>
              <ol className={mapCss("breadcrumb", "p-r-15")}>
                <li className={mapCss("breadcrumb-item")}><a href="javascript:void(0)">Trang chủ</a></li>
                <li className={mapCss("breadcrumb-item", "active")}>BÀI VIẾT</li>
              </ol>
            </div>
          </div>
        </div>
        <div className={mapCss("row", "el-element-overlay")}>
          <div className={mapCss("col-md-12")}>
            <div className={mapCss("card")}>
              <div className={mapCss("card-body")}>
                <h5 className={mapCss("card-title", "m-0")}></h5>
                <div hidden={!this.isLoading} className={mapCss("row")} id="post-skeleton">
                  {skeleton}
                </div>
                <div className={mapCss("row")} >
                  {posts}
                </div >
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Post;