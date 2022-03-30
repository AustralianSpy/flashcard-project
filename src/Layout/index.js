import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { listDecks } from '../utils/api';

import CreateDeckBtn from './Components/CreateDeckBtn';
import Deck from './DeckCrud/Deck';
import ListDecks from './DeckList/ListDecks';
import Header from './Header';
import NotFound from './NotFound';


function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await listDecks(abortController.signal);
        setDecks([...response]);
      } catch (error) {
        throw error;
      }
    }

    fetchData();
    return () => { abortController.abort() };
  }, [])
  
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path='/'>
            <CreateDeckBtn />
            <ListDecks decks={decks} />
          </Route>
          <Route path='/decks'>
            <Deck />
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
