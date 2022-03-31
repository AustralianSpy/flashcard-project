import React from 'react';
import DeckThumbnail from './DeckThumbnail';

export default function ListDecks({ decks, handleDeleteDeck }) {
    return (
        <div className="container p-0">
            {decks.map((deck) => (
                <DeckThumbnail key={deck.id} deck={deck} handleDelete={() => handleDeleteDeck(deck.id)} />
            ))}
        </div>
    );
}