import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { readDeck, readCard } from '../../utils/api';

import CardForm from '../Components/CardForm';

export default function EditCard({ nav }) {
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({})
    const { deckId, cardId } = useParams();
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

    // fetch information for individual card.
    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
        try {
            const response = await readCard(cardId, abortController.signal);
            setCard({...response});
        } catch (error) {
            throw error;
        }
    }
        fetchData();
        return () => { abortController.abort() };
    }, [cardId]);

    // change page-title to reflect deck.
    useEffect(() => {
        (card.name) ?
            document.title = `Edit Card ${card.id}` :
            document.title = `Edit Card`;
    }, [card]);

    // set breadcrumbs for navigation.
    useEffect(() => {
        const crumbs = [
            {
                name: `${deck.name}`,
                url: `/decks/${deckId}`,
            },
            {
                name: `Edit Card ${cardId}`,
                url: `${url}`
            },
        ];
        nav(crumbs);
    }, [deck, nav, url, deckId, cardId]);

    // handle changes made to deck by form, pass down to form as props.
    const handleChange = ({ target }) => {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    };
    
    return (
        <>
            <h2>Edit Card {cardId}</h2>
            <CardForm card={card} handleChange={handleChange} />
        </>
    )
}