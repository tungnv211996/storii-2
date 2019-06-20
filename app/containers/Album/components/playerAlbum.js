
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import AudioPlayer from 'react-responsive-audio-player';
import { withRouter } from 'react-router-dom';
import Store from '../../../storeConfig/register';

@inject(Store.AudioPlayerStore)

@observer
class PlayerAlbum extends Component {

    @observable audioId = [];

    componentDidMount = async () => {
        this.audioId = this.props.id
        await this.props.audioPlayerStore.fetchPlayList(this.audioId)
    }

    componentWillReceiveProps = async (nextProps) => {
        this.audioId = nextProps.id
        await this.props.audioPlayerStore.fetchPlayList(this.audioId)
    }

    render() {
        const { playList } = this.props.audioPlayerStore
        return (
            <div>
                {(playList.length !== 0) ? <AudioPlayer
                    playlist={playList}
                    autoplay /> : ''}
            </div>
        )
    }
}
export default withRouter(PlayerAlbum)