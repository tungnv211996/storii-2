import LeftSideBarStore from '../../app/components/LeftSideBar/stores/leftSideBarStore';
import PaymentStore from '../containers/TradeCoin/stores/paymentStore';
import ProfileStore from '../containers/Profile/stores/profileStore';
import NotificationStore from '../components/Header/stores/notificationStore';
import AudioPlayerStore from '../containers/Album/store/playerStore';
import StreamChatStores from '../components/StreamChat/stores/streamChatStore';
import MediaContentStore from '../globalStore/mediaContentStore';
import PlayListStore from '../containers/PlayList/stores/playListStore';
export default function initializeStores() {
  return {
    leftSideBarStore: new LeftSideBarStore(),
    paymentStore: new PaymentStore(),
    profileStore: new ProfileStore(),
    notificationStore: new NotificationStore(),
    audioPlayerStore: new AudioPlayerStore(),
    streamChatStores: new StreamChatStores(),
    mediaContentStore: new MediaContentStore(),
    playListStore: new PlayListStore()
  };
}