import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import EditCard from './EditCard';
import CreateCard from './CreateCard';

export default function Card({ nav }) {
    const { path } = useRouteMatch();
    
    return (
            <Switch>
                <Route path={`${path}/new`}>
                    <CreateCard nav={nav} />
                </Route>
                <Route path={`${path}/:cardId/edit`}>
                    <EditCard nav={nav} />
                </Route>
            </Switch>
    );
}