import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Layout from '../layout/';

const App = () => (
    <Fragment>
        <Route path="/" component={Layout} />
    </Fragment>
);

export default App;
