import React, { useState, useEffect } from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import { readDeck } from '../../utils/api';

import CardForm from '../Components/CardForm';

export default function AddCard({ nav }) {
    // assessment requires a request for the entire deck, however i think grabbing the
    // deckId from params to make a POST request would have
    // been fine, considering the child form only requires the deckId.
    // no reason to re-request what i already have.

    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({})
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
            document.title = `${deck.name}: Add Card` :
            document.title = `Add Card`;
    }, [deck]);

    // set breadcrumbs for navigation.
    useEffect(() => {
        const crumbs = [
            {
                name: `${deck.name}`,
                url: `/decks/${deckId}`,
            },
            {
                name: `Add Card`,
                url: `${url}`
            },
        ];
        nav(crumbs);
    }, [deck, nav, url, deckId]);

    // handle changes made to deck by form, pass down to form as props.
    const handleChange = ({ target }) => {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    };
    
    return (
        <>
            <h2>{deck.name}: Add Card</h2>
            <CardForm card={card} handleChange={handleChange} />
        </>
    )
}