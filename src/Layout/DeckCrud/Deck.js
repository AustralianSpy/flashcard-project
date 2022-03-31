import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import BreadcrumbBar from '../Components/BreadcrumbBar';
import ViewDeck from './ViewDeck';
import EditDeck from './EditDeck';
import CreateDeck from './CreateDeck';
import AddCard from '../CardCrud/CreateCard';
import EditCard from '../CardCrud/EditCard';

export default function Deck() {
    const { path } = useRouteMatch();
    
    return (
        <section className="container">
            <BreadcrumbBar />
            <Switch>
                <Route exact path={path}>
                    <ViewDeck />
                </Route>
                <Route path={`${path}/new`}>
                    <CreateDeck />
                </Route>
                <Route path={`${path}/edit`}>
                    <EditDeck />
                </Route>
                <Route path={`${path}/cards`}>
                    <AddCard />
                </Route>
                <Route>
                    <EditCard />
                </Route>
            </Switch>
        </section>
    );
}