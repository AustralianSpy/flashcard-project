import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateDeckBtn from './Components/CreateDeckBtn';
import DeckList from './DeckCrud/DeckList';
import Header from './Header';
import NotFound from './NotFound';

/*
TODO: fetch a list of decks, map to individual modules.
TODO: routing.
*/

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <CreateDeckBtn />
        <DeckList />
        <NotFound />
      </div>
    </>
  );
}

export default Layout;
