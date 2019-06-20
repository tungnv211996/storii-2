import React, { Component } from 'react';
import { mapCss } from '../../libs/extensions';
import Header from '../../components/Header';
import LeftSideBar from '../../components/LeftSideBar';
import { inject, observer } from 'mobx-react';
import Stores from '../../storeConfig/register';
import classNames from 'classnames';

@inject(Stores.LeftSideBarStore)
@observer
export default class Layout extends Component {
    loadScript() {
        const { isToggle } = this.props.leftSideBarStore;
        document.getElementsByTagName('body')[0].setAttribute('class', classNames(mapCss('fixed-layout', 'skin-blue'), { [mapCss('mini-sidebar')]: isToggle }));
    }

    componentDidMount() {
        this.loadScript();
    }

    componentDidUpdate() {
        this.loadScript();
    }

    render() {
        return (
            <div id="main-wrapper">
                <Header />
                <LeftSideBar />
                <div className={mapCss("page-wrapper")}>
                    <div className={mapCss("container-fluid")} style={{ minHeight: window.screen.height }}>
                        {this.props.children}
                    </div>
                </div>
                <footer className={mapCss("footer")}>
                    Storii ©{new Date().getFullYear()} Created by VASTbit
        </footer>
            </div>
        );
    }
}