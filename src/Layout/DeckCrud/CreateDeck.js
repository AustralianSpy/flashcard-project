import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import DeckForm from '../Components/DeckForm';

export default function CreateDeck({ nav }) {
    const [deck, setDeck] = useState({ id: '', name: '', description: ''});
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
    
    // handle changes made to deck by form, pass down to form as props.
    const handleChange = ({ target }) => {
        setDeck({
            ...deck,
            [target.name]: target.value,
        });
    };

    return (
        <div className="container mb-5">
            <h2 className='mb-4'>Create a deck.</h2>
            <DeckForm deck={deck} handleChange={handleChange} />
        </div>
    );
}