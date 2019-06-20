import React, { Component } from 'react';
import { Upload, Button, Icon, Spin } from 'antd';
import { observable } from 'mobx';
import Parse from '../../parse/parseServer';
import { observer } from 'mobx-react';
import { mapCss } from '../../libs/extensions';

@observer
export default class ImageUpload extends Component {
    @observable loading = false;

    uploadImage = async file => {
        this.loading = true;
        const imageFile = await new Parse.File(file.name, file).save();
        this.loading = false
        return imageFile;
    }

    handleCustomRequest = option => {
        const { onSuccess, onError, file, action, onProgress } = option;
        this.uploadImage(file)
            .then(data => {
                onSuccess(data);
                this.props.onChange && this.props.onChange(data._url);
            });
    }

    render() {
        const imageUrl = this.props.value || this.props.path;
        const fileList = imageUrl && Boolean(this.props.hasDefaultFileList) ? [
            {
                uid: ''.guid(),
                name: (imageUrl || '').split('/').pop(),
                status: 'done',
                url: imageUrl,
                thumbUrl: imageUrl,
            }] : [];
        return (
            <div>
                <Upload
                    defaultFileList={fileList}
                    disabled={this.loading}
                    key={imageUrl}
                    listType="picture"
                    multiple={false}
                    customRequest={this.handleCustomRequest}
                >
                    <button className={mapCss('btn', 'btn-secondary')}> <i className={mapCss('fas', 'fa-image')}></i> {this.props.title || 'Tải lên'}</button>
                </Upload>
            </div>

        )
    }
}