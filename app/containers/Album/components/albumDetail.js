import React, { Component } from 'react';
import Table from './table';
import { mapCss } from '../../../libs/extensions';
import Parse from '../../../parse/parseServer';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { withRouter } from 'react-router-dom';
import PlayerAlbum from './playerAlbum';

@observer
class AlbumDetail extends Component {
    @observable audioContents = [];
    @observable albumId = '';
    @observable audioIdsToPlayer = [];
    @observable albumContent = {
        title: '',
        thumbnail: ''
    };

    @observable mediaContentIds = [];
    constructor(props) {
        super(props);
        this.albumId = this.props.match.params.id;
    }
    async fetchAudios() {
        const album = await new Parse.Query('Album')
            .equalTo('albumId', this.albumId)
            .find();

        album.map(data => {
            this.mediaContentIds.push(data.get('mediaContentId'));
        });

        const audios = await new Parse.Query('MediaContent')
            .equalTo('isDeleted', false)
            .containedIn('objectId', this.mediaContentIds)
            .find();
        this.audioIdsToPlayer = this.mediaContentIds;
        this.audioContents = audios.map(data => ({
            id: data.id,
            title: data.get('title'),
            artists: data.get('artists'),
            price: data.get('price'),
            thumbnail: data.get('metadata').thumbnail
        }));
    }

    async fetchAlbumContent() {
        const album = await new Parse.Query('MediaContent')
            .equalTo('isDeleted', false)
            .equalTo('objectId', this.albumId)
            .first();
        this.albumContent.title = album.get('title');
        this.albumContent.thumbnail = album.get('metadata').thumbnail;

    }
    componentDidMount() {
        this.fetchAudios();
        this.fetchAlbumContent();
    }

    render() {
        const { albumContent } = this
        return (
            <div>
                <div className={mapCss("row", "page-titles")}>
                    <div className={mapCss("col-md-5", "align-self-center")}>
                        <h4 className={mapCss("text-themecolor")}>Album</h4>
                    </div>
                    <div className={mapCss("col-md-7", "align-self-center text-right")}>
                        <div className={mapCss("d-flex", "justify-content-end", "align-items-center")}>
                            <ol className={mapCss("breadcrumb")}>
                                <li className={mapCss("breadcrumb-item")}><a href="javascript:void(0)">Trang chủ</a></li>
                                <li className={mapCss("breadcrumb-item", "active")}>Album</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className={mapCss("row", "el-element-overlay")}>
                    <div className={mapCss("col-md-12")}>
                        <div className={mapCss("card")}>
                            <div className={mapCss("card-body")}>
                                <div className={mapCss("el-card-avatar", "el-overlay-1")}
                                    style={{ background: `url(${albumContent.thumbnail})` + 'no-repeat center center', height: '30vh' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={mapCss("row", "el-element-overlay")}>
                    <div className={mapCss("col-md-12")}>
                        <div className={mapCss("card")}>
                            <div className={mapCss("card-body")}>
                                <h5 className={mapCss("card-title")}>{albumContent.title}</h5>
                                <Table datas={this.audioContents} />
                            </div>
                        </div>
                    </div>
                </div>
                <PlayerAlbum id={this.audioIdsToPlayer} />
            </div>
        )
    }
}
export default withRouter(AlbumDetail);