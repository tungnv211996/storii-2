import React, { Component } from 'react';
import { Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd';
import moment from 'moment';
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx';
import Parse from '../../parse/parseServer';
import { withRouter, Link } from 'react-router-dom';
import Stores from '../../storeConfig/register';
import { mapCss } from '../../libs/extensions';

const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Bình luận
        </Button>
        </Form.Item>
    </div>
);

@inject(Stores.ProfileStore)

@observer
class Comments extends Component {
    @observable comments = [];
    @observable page = 1;
    @observable id = this.props.match.params.id;
    state = {
        submitting: false,
        value: '',
    };
    loadMore = () => {
        this.page++;
        this.fetchComment();
    }
    fetchComment = async () => {
        const results = await Parse.Cloud.run('fetchComment', {
            mediaContentId: this.id,
            page: this.page,
            pageSize: 10
        });
        // this.comments = [];
        results.map(comment => {
            this.comments.push({
                // actions: [<span>Reply to</span>],
                actions: '',
                author: comment.owner.fullname,
                avatar: comment.owner.avatar ? comment.owner.avatar : require('../../assets/images/user.png'),
                content: (
                    <p>
                        {comment.content}
                    </p>
                ),
                datetime: (
                    <Tooltip
                        title={moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    >
                        <span>
                            {moment(comment.createdAt).fromNow()}
                        </span>
                    </Tooltip>
                ),
            })
        });
    }

    componentDidMount = async () => {
        await this.fetchComment();
        this.props.profileStore.fetch();
    }

    handleSubmit = async () => {
        if (!this.state.value) {
            return;
        }
        this.setState({
            submitting: true,
        });

        await Parse.Cloud.run('commentMediaContent', {
            text: this.state.value,
            mediaContentId: this.id
        });
        this.comments = [];
        this.page = 1;
        await this.fetchComment();

        this.setState({
            submitting: false,
            value: '',
        });

    };
    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        const { profile } = this.props.profileStore;
        const { submitting, value } = this.state;
        const { comments } = this
        return (
            <div>
                <Comment
                    avatar={
                        <Avatar
                            src={profile.avatar || require('../../assets/images/user.png')}
                            alt={profile.fullname}
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />

                <List
                    className="comment-list"
                    header={`${comments.length} nhận xét`}
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={item => (
                        <li>
                            <Comment
                                actions={item.actions}
                                author={item.author}
                                avatar={item.avatar}
                                content={item.content}
                                datetime={item.datetime}
                            />
                        </li>
                    )}
                />
                <a href="javascript:void()" onClick={this.loadMore} className={mapCss("col-md-offset-5")}>Xem thêm...</a>

            </div>
        )
    }
}

export default withRouter(Comments);