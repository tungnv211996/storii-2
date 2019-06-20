import Parse from "../../../parse/parseServer";
import { observable, action } from "mobx";
import appConst from "../../../libs/appConst";

export default class PlayListStore {
  @observable playList = {};
  @observable playLists = [];

  setPlayList(playList) {
    this.playList = playList;
  }
  setPlayLists(playLists) {
    this.playLists = playLists;
  }
  @action
  addMediaToplayList = async (mediaId, playListId) => {
    const media = new Parse.Object('MediaContent');
    media.id = mediaId;
    const playList = await new Parse.Query('PlayList').include('mediaContents').get(playListId);
    let mediaContentNews = playList.get('mediaContents')
    mediaContentNews.push(media);
    playList.save({
      mediaContents: mediaContentNews
    });
  }
  @action
  createPlayList = async (titleNew, medias = []) => {
    let mediaIds = [];
    if (medias[0])
      medias.map((media) => {
        let mediaNew = new Parse.Object('MediaContent');
        mediaNew.id = media.id;
        mediaIds.push(mediaNew);
      });
    const playList = new Parse.Object('PlayList');
    playList.save({
      title: titleNew,
      isDeleted: false,
      userOwnerId: Parse.User.current().id,
      mediaContents: mediaIds
    });
  }
  @action
  fetchPlayListById = async (id) => {
    console.log(id);
    console.log('id');
    const playList = await new Parse.Query('PlayList')
      .include(['mediaContents', 'mediaContents.creator'])
      .equalTo('objectId', '181BVZaLR7')
      .equalTo('isDeleted', false)
      .first();
    this.setPlayList(playList);
  }
  @action
  fetchPlayLists = async () => {
    const playLists = await new Parse.Query('PlayList')
      .include('mediaContents')
      .equalTo('isDeleted', false)
      .find();
    this.setPlayLists(playLists);
  }
}