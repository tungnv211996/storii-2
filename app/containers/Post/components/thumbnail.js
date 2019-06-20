import React, { Component } from 'react';
import { mapCss, changeAlias } from '../../../libs/extensions';
import { Tooltip, Typography } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
class PostThumbnail extends Component {

  nagative = linkDetail => {
    this.props.history.push(linkDetail)
  }
  render() {
    const { infoPost } = this.props;
    const { Paragraph } = Typography;
    const linkDetail = `/post-detail/${changeAlias(infoPost.get('title'))}/${infoPost.id}`;
    return (

      <div className={mapCss("el-card-item", 'col-12')}      >
        {infoPost ? <div style={{ display: 'table', margin: '0 auto' }}>
          <div className={mapCss("el-card-avatar", "el-overlay-1")}
            style={{ backgroundImage: `url(${infoPost.get('thumnail')})`, height: '50vh', width: '50vw' }}>
            <div className={mapCss("el-overlay")}>
            </div>
          </div></div> : null}
        <div className={mapCss("el-card-content", "text-center")}>
          <Tooltip title={infoPost.get('title')}>
            <h4 className={mapCss("m-b-0", "text-truncate")}>{infoPost.get('title')}</h4>
          </Tooltip>
          <div>
            <small className={mapCss("text-muted")}>{moment(infoPost.createdAt).fromNow()} bởi {infoPost.get('author').get('fullname')}
            </small>
          </div>

        </div>
        <Paragraph ellipsis={{ rows: 2, expandable: false }} style={{ marginLeft: '10%', marginRight: '10%' }}>
          <div dangerouslySetInnerHTML={{ __html: infoPost.get('bodyHtml') }} />
        </Paragraph>
        <div style={{ textAlign: 'center' }} onClick={() => this.nagative(linkDetail)}>
          <a className={mapCss("btn", "btn-primary")} href="javascript:void()">Đọc tiếp</a></div>

      </div>
    )
  }
}
export default withRouter(PostThumbnail);