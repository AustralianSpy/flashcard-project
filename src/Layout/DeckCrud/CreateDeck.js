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
        if (crumbs[0]['name'] !== 'undefined'){
            nav(crumbs);
        }
    }, [nav, url])
    
    // this component handles the state of the deck being created, which is
    // passed down to the form as props. the following handler updates the
    // state of said deck according to user inputs.
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