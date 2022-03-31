import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import BreadcrumbBar from '../Components/BreadcrumbBar';
import EditCard from './EditCard';
import CreateCard from './CreateCard';

export default function Deck() {
    const { path } = useRouteMatch();
    
    return (
        <section className="container">
            <BreadcrumbBar />
            <Switch>
                <Route path={`${path}/new`}>
                    <CreateCard />
                </Route>
                <Route path={`${path}/:cardId/edit`}>
                    <EditCard />
                </Route>
            </Switch>
        </section>
    );
}