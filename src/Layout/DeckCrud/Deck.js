import React, { useCallback, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import BreadcrumbBar from '../Components/BreadcrumbBar';
import ViewDeck from './ViewDeck';
import EditDeck from './EditDeck';
import CreateDeck from './CreateDeck';
import Card from '../CardCrud/Card';
import StudyDeck from './StudyDeck';

export default function Deck({ handleDeleteDeck }) {
    const { path } = useRouteMatch();
    
    // logic to handle the state of the breadcrumb bar without
    // re-implimenting the bar on every page.
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const handleBreadcrumbs = useCallback((crumbs = []) => {
        // take in an array of objects, hard-coded on each component
        /* 
            {
                name: '',
                url: '',
            };
        */
        // if on Home page, clear breadcrumbs.
        if (!crumbs.length) {
            setBreadcrumbs([]);
        } else {
            setBreadcrumbs([...crumbs]);
        }
    }, []);
    
    return (
        <section className="container">
            <BreadcrumbBar breadcrumbs={breadcrumbs} />
            <Switch>
                <Route path={`${path}/new`}>
                    <CreateDeck nav={handleBreadcrumbs} />
                </Route>
                <Route exact path={`${path}/:deckId`}>
                    <ViewDeck nav={handleBreadcrumbs} handleDeleteDeck={handleDeleteDeck} />
                </Route>
                <Route path={`${path}/:deckId/edit`}>
                    <EditDeck nav={handleBreadcrumbs} />
                </Route>
                <Route path={`${path}/:deckId/cards`}>
                    <Card nav={handleBreadcrumbs} />
                </Route>
                <Route path={`${path}/:deckId/study`}>
                    <StudyDeck nav={handleBreadcrumbs} />
                </Route>
            </Switch>
        </section>
    );
}