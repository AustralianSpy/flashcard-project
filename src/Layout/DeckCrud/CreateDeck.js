import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

export default function CreateDeck({ nav }) {
    const { url } = useRouteMatch();

    // change page-title to reflect deck.
    useEffect(() => {
        document.title = 'Create Deck';
    }, []);

    // set breadcrumbs for navigation.
    useEffect(() => {
        const crumbs = [
            {
                name: `Create Deck`,
                url: `${url}`,
            }
        ];
        nav(crumbs);
    }, [nav, url])
    
    return <h2>Create a deck.</h2>;
}