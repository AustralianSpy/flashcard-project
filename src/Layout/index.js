import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { deleteDeck, listDecks } from '../utils/api';

import CreateDeckBtn from './Components/CreateDeckBtn';
import Deck from './DeckCrud/Deck';
import ListDecks from './DeckList/ListDecks';
import Header from './Header';
import NotFound from './NotFound';


function Layout() {
  const [decks, setDecks] = useState([]);

  // fetch list of all decks of cards, if any.
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
  }, []);

  // handle the deletion of decks... declared here to pass down to multiple
  // components instead of re-defining. on confirming modal dialog, request
  // is sent for deletion. if successful, return to home page.
  const handleDeleteDeck = (idToDelete) => {
    if (window.confirm('Do you really want to delete this deck?')){
      const abortController = new AbortController();
      const deleteRequest = async () => {
        try {
          const response = await deleteDeck(idToDelete, abortController.signal);
          console.log('Deck deleted:', response);
          window.location.reload();
        } catch (error) {
          throw error;
        }
      }
      deleteRequest();

      return () => { abortController.abort() };
    }
  };
  
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path='/'>
            <CreateDeckBtn />
            <ListDecks decks={decks} handleDeleteDeck={handleDeleteDeck} />
          </Route>
          <Route path='/decks'>
            <Deck handleDeleteDeck={handleDeleteDeck} />
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
