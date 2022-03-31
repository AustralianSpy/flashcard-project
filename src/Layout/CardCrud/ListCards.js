import React from 'react';
import ViewCard from './ViewCard';

export default function ListCards({ cards }) {
    return (
        <div className="container p-0 mb-4">
            <h2>Cards</h2>
            { cards ? cards.map((card) => (
                <ViewCard key={card.id} card={card} />
            )) : null}
        </div>
    );
}