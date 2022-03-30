import React from 'react';
import DeckThumbnail from './DeckThumbnail';

export default function ListDecks(decks = []) {
    return (
        <div className="container">
            {decks.map((deck) => (
                <DeckThumbnail key={deck.id} deck={deck} />
            ))}
        </div>
    );
}