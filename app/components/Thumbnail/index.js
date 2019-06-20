import React, { Component } from 'react';
import { mapCss, changeAlias } from '../../libs/extensions';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Typography, Popover, Tooltip, Modal } from 'antd';
import { mediaContentType, ProductTypeEnum } from '../../libs/commonEnum';
import appConst from '../../libs/appConst';
import numeral from 'numeral';
import Parse from '../../parse/parseServer';
import { PaymentResponseCode } from '../../libs/commonEnum';
import paymentService from '../../service/paymentService';
import { inject, observer } from 'mobx-react';
import Stores from '../../storeConfig/register';

@inject(Stores.MediaContentStore)
@observer
class Thumbnail extends Component {
    prefixPath = {
        [mediaContentType.Video]: "video-detail",
        [mediaContentType.Music]: "audio-detail",
        [mediaContentType.AlbumMusic]: "album-detail",
    }

    nagative = linkDetail => {
        this.props.history.push(linkDetail);
    };

    pay = (infoMedia, link) => {
        Modal.confirm({
            title: `Bạn có muốn mua ?`,
            content: `${infoMedia.title} có giá ${numeral(infoMedia.price).format()} ${infoMedia.unit}`,
            okText: 'Thanh toán',
            cancelText: 'Hủy',
            onOk: async () => {
                await paymentService.payMediaContent(infoMedia);
                this.updateMediaContentStatus(infoMedia);
                this.nagative(link);
            }
        });
    };

    updateMediaContentStatus(infoMedia) {
        const { suggestions } = this.props.mediaContentStore;
        const mediaContents = [...suggestions];
        const [mediaContent] = mediaContents.filter(item => item.id === infoMedia.id);
        if (mediaContent) {
            mediaContent.isPaid = true;
            this.props.mediaContentStore.setSuggestion(mediaContents);
        }
    }

    render() {
        const { infoMedia } = this.props;
        const page = this.prefixPath[infoMedia.contentType];
        const linkDetail = `/${page}/${changeAlias(infoMedia.title)}/${infoMedia.id}`;
        const isFree = infoMedia.price === 0 || infoMedia.isFree;
        return (
            <div className={mapCss("col-lg-2", "col-md-6")}>
                <div className={mapCss("el-card-item")}>
                    {infoMedia ? <div onClick={() => infoMedia.isPaid ? this.nagative(linkDetail) : this.pay(infoMedia, linkDetail)}
                        className={mapCss("el-card-avatar", "el-overlay-1")}
                        style={{ backgroundImage: `url(${infoMedia.metadata.thumbnail})`, height: '17vh' }}>
                        <span
                            hidden={!(infoMedia.contentType !== mediaContentType.AlbumMusic && infoMedia.liveStreaming)}
                            style={{ backgroundColor: 'red' }}
                            className={mapCss("vd-time", "badge", "badge-danger", "text-uppercase", 'p-1')}>Trực tiếp</span>
                        <div className={mapCss("el-overlay")}>
                            <ul className={mapCss("el-info")}>
                                <li>
                                    <a style={{ padding: '10px 15px 10px 18px' }} className={mapCss("img-circle", "font-20")} href="javascript:void(0);">
                                        <i className={mapCss("fa", "fa-play")} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div> : null}
                    <div className={mapCss("el-card-content", "text-left")}>
                        <Tooltip title={infoMedia.title}>
                            <h5 className={mapCss("m-b-0", "text-truncate")}>{infoMedia.title}</h5>
                        </Tooltip>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td><small className={mapCss("text-muted")}>{infoMedia.creator.fullname} </small></td>
                                    {isFree && (
                                        <td className={mapCss('text-right')}>
                                            <span className={mapCss('badge', 'badge-dark')}>Miễn phí</span>
                                        </td>
                                    )}
                                    {
                                        !isFree && !infoMedia.isPaid && (
                                            <td className={mapCss('text-right')}>
                                                <span className={mapCss('badge', 'badge-danger')}> {numeral(infoMedia.price).format()} {infoMedia.unit}</span>
                                            </td>
                                        )
                                    }
                                    {
                                        !isFree && infoMedia.isPaid && (
                                            <td className={mapCss('text-right')}>
                                                <span className={mapCss('badge', 'badge-info')}>Đã thanh toán</span>
                                            </td>
                                        )
                                    }
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <small className={mapCss("text-muted")}>{infoMedia.view_count} lượt xem • </small>
                            <small className={mapCss("text-muted")}>{moment(infoMedia.createdAt).fromNow()}</small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Thumbnail.defaultProps = {
    callback: () => { }
}

export default withRouter(Thumbnail);