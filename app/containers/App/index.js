import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Login from '../Login/index';
import Header from '../../components/Header/index';
import SignUp from '../Signup/index'
import GlobalStyle from '../../global-styles';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import TradeCoin from '../../containers/TradeCoin';
import Audios from '../Audios/index';
import Videos from '../Videos/index';
import VideoDetail from '../Videos/components/videoDetail';
import AudioDetail from '../Audios/components/audioDetail';
import Profile from '../../containers/Profile';
import AlbumDetail from '../Album/components/albumDetail';
import MyOrder from '../../containers/MyOrder';
import UserProfile from '../UserProfile/index';
import NotificationsPage from '../Notification/index';
import Subscription from '../Subscription';
import Post from '../Post/index';
import PlayList from '../PlayList/index';
import PostDetail from '../Post/components/postDetail';
export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/coin" component={TradeCoin} />
        <PrivateRoute exact path="/audios" component={Audios} />
        <PrivateRoute exact path="/audios/:title/:id" component={Audios} />
        <PrivateRoute exact path="/audio-detail/:title/:id" component={AudioDetail} />
        <PrivateRoute exact path="/album-detail/:title/:id" component={AlbumDetail} />
        <PrivateRoute exact path="/videos" component={Videos} />
        <PrivateRoute exact path="/video-detail/:title/:id" component={VideoDetail} />
        <PrivateRoute exact path="/chanel/:fullname/:id" component={UserProfile} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/my-order" component={MyOrder} />
        <PrivateRoute exact path="/notifications" component={NotificationsPage} />
        <PrivateRoute exact path="/subscriptions" component={Subscription} />
        <PrivateRoute exact path="/posts" component={Post} />
        <PrivateRoute exact path="/post-detail/:title/:id" component={PostDetail} />
        <PrivateRoute exact path="/playlist" component={PlayList} />
        <PrivateRoute exact path="/playlist/video/:title/:playListId/:id" component={VideoDetail} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

