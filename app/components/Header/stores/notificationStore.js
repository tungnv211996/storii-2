import { observable } from 'mobx';
import Parse from '../../../parse/parseServer';
import _ from 'lodash';
import moment from 'moment';

export default class NotificationStore {
    @observable notifications = [];

    async fetch() {
        const data = await Parse.Cloud.run('fetchNotifications');
        this.notifications = data.map(item => {
            return {
                ...item,
                createdAtFormat: moment(item.createdAt).fromNow(),
            }
        });
    }

    setNotifications(notifications){
        this.notifications = notifications;
    }
}