import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import Loading from '../../../components/Loading/index';
import { mapCss } from '../../../libs/extensions';
import Parse from '../../../parse/parseServer';
import Thumbnail from '../../../components/Thumbnail/index';
import Album from '../../Album/index';
import Table from '../../Album/components/table';

@observer
class MediaContent extends Component {
    @observable mediaContent = [];
    @observable audioContent = [];
    @observable videoContent = [];
    @observable albumContent = [];
    @observable flat = false;

    fetchmediaContent = async () => {
        this.mediaContent = await Parse.Cloud.run('fetchListMediaContentByCreator', {
            creatorId: this.props.match.params.id,
            contentTypes: [1, 2, 3]
        });
        this.mediaContent.map((item) => {
            if (item.contentType === 1)
                this.videoContent.push(item);
            else if (item.contentType === 2)
                this.audioContent.push({
                    id: item.id,
                    title: item.title,
                    creator: item.creator,
                    price: item.price,
                    viewCount: item.view_count,
                    createdAt: item.createdAt,
                    thumbnail: item.metadata.thumbnail,
                })
            else this.albumContent.push(item)
        })
    }
    componentDidMount = async () => {
        this.flat = true;
        await this.fetchmediaContent();
        this.flat = false;
    }
    render() {
        var video, album = '';
        if (this.videoContent.length > 0)
            video = this.videoContent.map((info, index) => {
                return (
                    <Thumbnail
                        infoMedia={info}
                        key={index}
                    />
                )
            });

        if (this.audioContent.length > 0)
            album = this.albumContent.map((info, index) => {
                return (
                    <Thumbnail
                        infoMedia={info}
                        key={index}
                    />
                )
            });
        return (
            <div className={mapCss("col-lg-9")}>
                <div className={mapCss("card")}>
                    <div className={mapCss("card-body")}>
                        <div className={mapCss("col-md-12")}>
                            <div className={mapCss("card")}>
                                <div className={mapCss("card-body")}>
                                    <h5 className={mapCss("card-title")}>THÔNG TIN</h5>
                                    <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. </p>
                                </div>
                            </div>
                        </div>
                        {this.audioContent.length > 0 ? <div className={mapCss("row", "el-element-overlay")}>
                            <div className={mapCss("col-md-12")}>
                                <div className={mapCss("card")}>
                                    <div className={mapCss("card-body")}>
                                        <h5 className={mapCss("card-title")}>BÀI HÁT</h5>
                                        <Loading flat={this.flat} />
                                        {!this.flat ? <div className={mapCss("row", "m-t-30")}>
                                            <Table datas={this.audioContent} />
                                        </div> : null}
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                        {this.videoContent.length > 0 ? <div className={mapCss("row", "el-element-overlay")}>
                            <div className={mapCss("col-md-12")}>
                                <div className={mapCss("card")}>
                                    <div className={mapCss("card-body")}>
                                        <h5 className={mapCss("card-title")}>PHIM ẢNH</h5>
                                        <Loading flat={this.flat} />
                                        {!this.flat ? <div className={mapCss("row", "m-t-30")}>
                                            {video}
                                        </div> : null}
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                        {this.albumContent.length > 0 ? <div className={mapCss("row", "el-element-overlay")}>
                            <div className={mapCss("col-md-12")}>
                                <div className={mapCss("card")}>
                                    <div className={mapCss("card-body")}>
                                        <h5 className={mapCss("card-title")}>DANH SÁCH NỔI BẬT</h5>
                                        <Loading flat={this.flat} />
                                        {!this.flat ? <div className={mapCss("row", "m-t-30")}>
                                            {album}
                                        </div> : null}
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                    </div>
                </div>
            </div>

        );
    }
}
export default withRouter(MediaContent);