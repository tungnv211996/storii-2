import React, { Component } from 'react';
import { mapCss } from '../../libs/extensions';
import Left from './components/left';
import Right from './components/right';
import Stores from '../../storeConfig/register';
import { observer, inject } from 'mobx-react';
import Parse from '../../parse/parseServer';
import { toJS } from 'mobx';



@inject(Stores.ProfileStore)
@observer
class Profile extends Component {
    componentDidMount() {
        this.props.profileStore.fetch();
    }

    render() {
        return (
            <div className={mapCss('row')}>
                <div className={mapCss('col-lg-4', 'col-xlg-3', 'col-md-5')}>
                    <Left />
                </div>
                <div className={mapCss('col-lg-8', 'col-xlg-9', 'col-md-7')}>
                    <Right />
                </div>
            </div>
        );
    }
}

export default Profile;