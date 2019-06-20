import { observable, action } from "mobx";
import Parse from "../../../parse/parseServer";

export default class ProfileStore {
    @observable profile = {
        wallet: {

        }
    };

    @action
    setProfile(value) {
        this.profile = value;
    }

    @action
    async fetch() {
        this.setProfile(await Parse.Cloud.run('fetchUserProfile'));
    }
}