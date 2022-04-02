import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import DeckForm from '../Components/DeckForm';

export default function EditDeck({ nav }) {
    const [deck, setDeck] = useState({ id: '', name: '', description: ''});
    const { deckId } = useParams();
    const { url } = useRouteMatch();

    // fetch the information for the deck.
    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
        try {
            const response = await readDeck(deckId, abortController.signal);
            setDeck({...response});
        } catch (error) {
            throw error;
        }
    }
        fetchData();
        return () => { abortController.abort() };
    }, [deckId]);

    // change page-title to reflect deck.
    useEffect(() => {
        (deck.name) ?
            document.title = `Edit ${deck.name}` :
            document.title = `Edit Deck`;
    }, [deck]);

    // set breadcrumbs for navigation.
    useEffect(() => {
        const crumbs = [
            {
                name: `${deck.name}`,
                url: `/decks/${deck.id}`,
            },
            {
                name: `Edit Deck`,
                url: `${url}`,
            },
        ];
        if (crumbs[0]['name'] !== 'undefined'){
            nav(crumbs);
        }
    }, [deck, nav, url]);

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
            <h2 className='mb-4'>Edit the deck.</h2>
            <DeckForm deck={deck} handleChange={handleChange} />
        </div>
    );
}