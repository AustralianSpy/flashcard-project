import React from 'react';
import { deleteCard } from '../../utils/api';

import ViewCard from './ViewCard';

export default function ListCards({ cards }) {
    // handler to delete a card, passed onto each child.
    const handleDeleteCard = (idToDelete, deckId) => {
        if (window.confirm('Do you really want to delete this card?')){
        const abortController = new AbortController();
        const deleteRequest = async () => {
            try {
                const response = await deleteCard(idToDelete, abortController.signal);
                console.log('Card deleted:', response);
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
        <div className="container p-0 mb-4">
            <h2>Cards</h2>
            { cards ? cards.map((card) => (
                <ViewCard key={card.id} card={card} handleDelete={() => handleDeleteCard(card.id, card.deckId)} />
            )) : null}
        </div>
    );
}