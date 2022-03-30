import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

// TODO: link to CreateDeck component

export default function CreateDeckBtn() {
    return (
        <Link to='/' className="btn btn-secondary my-2 w-30 h-5">
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth={2}
                class="bi bi-plus"
                viewBox="0 0 16 16"
            >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Create Deck
        </Link>
    );
}