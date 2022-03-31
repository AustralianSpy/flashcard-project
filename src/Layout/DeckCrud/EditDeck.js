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
        nav(crumbs);
    }, [deck, nav, url]);

    // handle changes made to deck by form, pass down to form as props.
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