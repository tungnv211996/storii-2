import { observable } from "mobx";

export default class LeftSideBarStore {
    @observable isToggle = false;

    @observable clientCount = 0;
}