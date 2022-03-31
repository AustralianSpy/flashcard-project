import React from 'react';
import ViewCard from './ViewCard';

export default function ListCards({ cards }) {
    return (
        <div className="container p-0">
            {cards.map((card) => (
                <ViewCard key={card.id} card={card} />
            ))}
        </div>
    );
}