import { observable, action } from "mobx";
import Parse from "../../../parse/parseServer";

export default class AudioPlayerStore {
    @observable playList = [];

    @action
    setPlayList(value) {
        this.playList = value;
    }

    @action
    async fetchPlayList(audioIds) {
        const audios = await new Parse.Query('MediaContent')
            .equalTo('isDeleted', false)
            .containedIn('objectId', audioIds)
            .find();
        const list = [];
        audios.map(data => {
            list.push({
                id: data.id,
                url: data.get('source').url,
                title: data.get('title'),
            })
        });
        this.setPlayList(list);
    }
}