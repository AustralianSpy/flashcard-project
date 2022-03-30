import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import BreadcrumbBar from './Components/BreadcrumbBar';
import ViewDeck from './DeckCrud/ViewDeck';
import EditDeck from './DeckCrud/EditDeck';
import AddCard from './CardCrud/AddCard';
import EditCard from './CardCrud/EditCard';

export default function Deck() {
    const { path } = useRouteMatch();
    
    return (
        <section className="container">
            <BreadcrumbBar />
            <Switch>
                <Route exact path={path}>
                    <ViewDeck />
                </Route>
                <Route path={`${path}/edit`}>
                    <EditDeck />
                </Route>
                <Route path={`$`}>
                    <AddCard />
                </Route>
                <Route>
                    <EditCard />
                </Route>
            </Switch>
        </section>
    );
}