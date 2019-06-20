/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import { Provider as StoreProvider } from 'mobx-react';
// Import root app
import App from 'containers/App';
// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';
import 'antd/dist/antd.css';
// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */
import helpers from '../app/libs/helpers'
import helperUI from '../app/libs/helperUI'
import configureStore from './configureStore';

import './assets/assets';
import { notification } from 'antd';
// Import i18n messages
import { translationMessages } from './i18n';
import initializeStores from './storeConfig/init';
import Parse from './parse/parseServer';
import moment from 'moment';
import 'moment/src/locale/vi';
moment().locale('vi');
// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');
const mobxStores = initializeStores();
const render = messages => {
    ReactDOM.render(
        <Provider store={store}>
            <LanguageProvider messages={messages}>
                <ConnectedRouter history={history}>
                    <StoreProvider {...mobxStores}>
                        <App />
                    </StoreProvider>
                </ConnectedRouter>
            </LanguageProvider>
        </Provider>,
        MOUNT_NODE,
    );
};

if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./i18n', 'containers/App'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render(translationMessages);
    });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
    new Promise(resolve => {
        resolve(import('intl'));
    })
        .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
        .then(() => render(translationMessages))
        .catch(err => {
            throw err;
        });
} else {
    render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

if (Parse.User.current()) {
    new Parse.Query('Notification')
        .equalTo('recipient', Parse.User.current().id)
        .subscribe()
        .then(event => {
            event.on('create', async state => {
                mobxStores.notificationStore.fetch();
                notification.open({
                    type: 'info',
                    message: 'Thông báo',
                    description: `${state.get('title')} - ${state.get('content')}`,
                });
            });
        });
}



window.addEventListener('unhandledrejection', function (event) {
    const { reason } = event;
    if (reason && reason.code && reason.message) {
        switch (reason.code) {
            case 209:
                helpers.clearToken();
                window.location.replace('/login');
                return;
            case 101:
                return helperUI.alertError('Đăng nhập thất bại', 'Email hoặc mật khẩu sai!');
            default:
                return helperUI.alertError(null, reason.message);
        }
    }
    helperUI.alertError();
    //console.error('Unhandled rejection (promise: ', event.promise, ', reason: ', event.reason, ').');
});