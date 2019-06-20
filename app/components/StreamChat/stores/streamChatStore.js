import { observable, action, computed } from "mobx";
import Parse from "../../../parse/parseServer";
import numeral from 'numeral';

export default class StreamChatStores {
  @observable comments = [];
  @observable mediaContentId = '';
  @observable subscriber = '';
  @observable _concurrentViewer = 0;
  @observable streamInterval = null;

  @computed
  get concurrentViewer() {
    return numeral(this._concurrentViewer).format();
  }

  @action
  setComment(newComment) {
    if (this.comments.length > 0 && this.comments[0].id !== newComment.id) {
      this.commentsReverse(newComment);
    }
    else this.commentsReverse(newComment);
  }

  @action
  commentsReverse(newComment) {
    const commentsReverse = [newComment];
    this.comments.map((comment) => commentsReverse.push(comment));
    this.comments = [...commentsReverse];
  }

  @action
  fetchComments = async () => {
    const [newComments] = await Parse.Cloud.run('fetchComment', {
      mediaContentId: this.mediaContentId,
      page: 1,
      pageSize: 1
    });
    this.setComment(newComments)
  }

  @action
  subscribeMediaToFetchComment = async () => {
    const mediaContent = new Parse.Object("MediaContent");
    mediaContent.id = this.mediaContentId;
    await mediaContent.fetch();
    if (Boolean(mediaContent.get('liveStreaming'))) {
      new Parse.Query('Comment')
        .equalTo('mediaContent', mediaContent)
        .subscribe()
        .then(event => {
          this.subscriber = event;
          this.subscriber.on('open', async () => {
            const rs = await Parse.Cloud.run('joinLiveRoom', { id: mediaContent.id });
            this._concurrentViewer = rs;
            this.streamInterval = setInterval(async () => {
              this._concurrentViewer = await Parse.Cloud.run('stream', { id: mediaContent.id });
            }, 5000)
          });
          this.subscriber.on('close', () => {
            Parse.Cloud.run('leaveLiveRoom', { id: mediaContent.id });
            clearInterval(this.streamInterval);
          });
          this.subscriber.on('create', () => {
            this.fetchComments();
          });
        });
    }
  }

  @action
  commentLive = async comment => {
    await Parse.Cloud.run('commentMediaContent', {
      text: comment,
      mediaContentId: this.mediaContentId
    });
  }

  unsubscribeMedia() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
      this.subscriber.on('close', () => {
        this.comments = [];
        this.subscriber = null;
      });
    }
  }
}