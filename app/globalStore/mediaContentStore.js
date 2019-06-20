import Parse from "../parse/parseServer";
import { observable, action } from "mobx";
import appConst from "../libs/appConst";

export default class MediaContentStore {
  @observable suggestions = [];
  @observable subscriptions = [];
  @observable media = {
    id: '',
    isLiked: false,
    title: '',
    metadata: {
      composer: '',
      thumbnail: '',
      shortDescription: ''
    },
    creator: {
      id: '',
      fullname: '',
      avatar: '',
      subscriberCount: '',
      isSubscribed: false
    },
    like_count: '',
    comment_count: '',
    view_count: '',
    contentType: 0,
    createdAt: '',
    source: {
      url: ''
    },
    liveStreaming: false
  };
  @observable medias = [
    {
      creator: {
        fullname: ''
      },
      metadata: {
        shortDescription: ''
      }
    }
  ];

  async fetchSuggestion() {
    const suggestions = await Parse.Cloud.run('getMySuggestion', { pageSize: 50, contentTypes: [1, 2, 3] });
    this.setSuggestion(suggestions);
  }

  async fetchSubscription({ pageSize }) {
    this.subscriptions = await Parse.Cloud.run('viewSubscriptions', { pageSize });
  }

  @action
  setSuggestion(suggestions) {
    this.suggestions = suggestions;
  }

  @action
  setMedia(media) {
    this.media = media
  }

  @action
  setMediaContents(medias) {
    this.medias = medias
  }
  fetchMediaById = async (id) => {
    this.setMedia(await new Parse.Cloud.run('getMediaContentById', { id }))
  }
  fetchMediaContents = async (contentTypes, page = 1, pageSize = appConst.defaultPageSize) => {
    this.setMediaContents(await Parse.Cloud.run('fetchMediaContent', { contentTypes, page, pageSize }))
  }
  updateMetaPage() {

    $('meta[name=appId]').remove();
    let appId = `<meta property="fb:app_id" name="appId" content=${appConst.facebookAppID}>`
    $('head').append(appId);
    $('meta[name=url]').remove();
    let url = `<meta property="og:url" name="url" content=${appConst.homePage}>`
    $('head').append(url);
    $('meta[name=type]').remove();
    let type = `<meta property="og:type" name="type" content="website">`
    $('head').append(type);
    $('meta[name=title]').remove();
    let title = `<meta property="og:title" name="title" content="${this.media.title}">`
    $('head').append(title);
    $('meta[name=description]').remove();
    let description = `<meta property="og:description" name="description" content="${this.media.title}">`
    $('head').append(description);
    $('meta[name=image]').remove();
    let image = `<meta property="og:image" name="image" content=${this.media.metadata.thumbnail}>`
    $('head').append(image);

  }
}