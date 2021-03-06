import React from 'react';
import { useHistory } from 'react-router-dom';

// button that links to the form to create a new deck of cards.
// individual component to limit clutter of parent component.

export default function CreateDeckBtn() {
    const history = useHistory();

    const createHandler = () => {
        history.push('/decks/new');
    }

    return (
        <button onClick={createHandler} className="btn btn-secondary my-2 w-30 h-5">
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth={2}
                className="bi bi-plus mr-2"
                viewBox="0 0 16 16"
            >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Create Deck
        </button>
    );
}