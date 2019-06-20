import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from '../../containers/Layout';
import Parse from '../../parse/parseServer';

export default function PrivateRoute({ component: Component, ...rest }) {
    function render(props) {
        if (Parse.User.current()) {
            return (
                <Layout>
                    <Component {...props} />
                </Layout>
            );
        }
        return <Redirect to="/login" />
    }
    return <Route {...rest} render={render} />;
}
