import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CreateDeckBtn from './Components/CreateDeckBtn';
import ListDecks from './DeckList/ListDecks';
import Header from './Header';
import NotFound from './NotFound';

/*
TODO: fetch a list of decks, map to individual modules.
TODO: routing.
*/

function Layout() {
  const { path } = useRouteMatch();
  const decks = [];
  
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={path}>
            <CreateDeckBtn />
            {/*
              Render ListDecks only if there ARE decks.
              <ListDecks decks={decks} />
            */}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
    </div>
    </>
  );
}

export default Layout;
