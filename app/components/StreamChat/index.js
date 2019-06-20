import React, { Component } from 'react';
import { mapCss } from '../../libs/extensions';
import Stores from '../../storeConfig/register';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Parse from '../../parse/parseServer';
import { observable } from 'mobx';


@inject(Stores.StreamChatStores, Stores.MediaContentStore)
@observer
class StreamChatBox extends Component {
  @observable subscriber = null;
  @observable commentText = '';

  componentDidMount = async () => {
    this.props.streamChatStores.mediaContentId = this.props.match.params.id;
    this.props.streamChatStores.subscribeMediaToFetchComment();
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (Boolean(this.commentText)) {
      await this.props.streamChatStores.commentLive(this.commentText);
      this.commentText = '';
    }
  }

  componentWillUnmount() {
    this.props.streamChatStores.unsubscribeMedia()
  }

  render() {
    const { comments } = this.props.streamChatStores;
    const { liveStreaming } = this.props.mediaContentStore.media;
    let comment = comments[0] !== undefined ? comments.map((comment, index) => {
      return (

        <li key={index}>
          <div className={mapCss("chat-img")}><img src={comment.owner.avatar || require('../../assets/images/user.png')} alt="user" /></div>
          <div className={mapCss("chat-content")}>
            <h6>{comment.owner.fullname}</h6>
            <div className={mapCss("box")}>{comment.content}</div>
          </div>
        </li>
      );
    }) : null;
    if (liveStreaming)
      return (

        <div className={mapCss("col-12", "col-sm-4", "col-md-4", "col-lg-4", "col-xl-4")}>
          <div className={mapCss("card", "m-b-0")}>
            <div className={mapCss("chat-main-box")}>
              <div className={mapCss("chat-right-aside")}>
                <div className={mapCss("chat-main-header")}>
                  <div className={mapCss("p-3", "b-b")}>
                    <h4 className={mapCss("box-title")}>Trò chuyện trực tuyến</h4>
                  </div>
                </div>
                <div className={mapCss("chat-rbox")}>
                  <ul className={mapCss("chat-list", "p-3")} style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
                    {comment}
                  </ul>
                </div>
                <div className={mapCss("card-body", "border-top")}>
                  <form onSubmit={this.handleSubmit}>
                    <div className={mapCss("row")}>
                      <div className={mapCss("col-8")}>
                        <input placeholder="Nói gì đó..."
                          onChange={event => this.commentText = event.target.value}
                          value={this.commentText}
                          className={mapCss("form-control", "border-0")} />
                      </div>
                      <div className={mapCss("col-4", "text-right")}>
                        <button type="submit" className={mapCss("btn", "btn-info", "btn-circle")}><i className={mapCss("fas", "fa-paper-plane")} /> </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    else return (<div>{}</div>)
  }
}
export default withRouter(StreamChatBox);