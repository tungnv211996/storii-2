import React, { Component } from 'react';
import { mapCss, changeAlias } from '../../../libs/extensions';
import Parse from '../../../parse/parseServer';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';
@observer
class PostDetail extends Component {
  @observable id = this.props.match.params.id;
  @observable post = {};
  @observable bodyHtml = '';
  fetchPost = async () => {
    const result = await new Parse.Query('Post')
      .equalTo('objectId', this.id)
      .equalTo('isPublished', true)
      .first()

    this.post = result
  }
  componentDidMount = async () => {
    await this.fetchPost()
    this.bodyHtml = this.post.get('bodyHtml')
  }
  render() {

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
                <div className={mapCss("card-body", 'dangerous')} style={{ marginLeft: '10%', marginRight: '10%' }}
                  dangerouslySetInnerHTML={{ __html: this.bodyHtml }} />

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(PostDetail)