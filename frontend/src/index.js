import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router';
import { BrowserRouter} from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import doc_Dashboard from './doc_Dashboard';
import addDrug from './Dashboard'
import doc_Login from './doc_Login'
import './Login.css';
import main from './main';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={main} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/doc_login' component={doc_Login} />
            <Route exact path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/doc_dashboard' component={doc_Dashboard} />
            <Route path='/add-drug' component={addDrug} />
            {/* <Route component={NotFound}/> */}
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);