import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import StudyCard from '../CardCrud/StudyCard';

export default function StudyDeck({ nav }) {
    const [deck, setDeck] = useState({});
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
            document.title = `Study: ${deck.name}` :
            document.title = `Study`;
    }, [deck]);

    // set breadcrumbs for navigation.
    useEffect(() => {
        const crumbs = [
            {
                name: `${deck.name}`,
                url: `/decks/${deck.id}`,
            },
            {
                name: 'Study',
                url: `${url}`,
            },
        ];
        if (crumbs[0]['name'] !== 'undefined'){
            nav(crumbs);
        }
    }, [deck, nav, url]);

    return (
        (deck.name) ?
        <div className="pb-4">
            <h2 className='mb-4'>Study: {deck.name}</h2>
            <StudyCard cards={deck.cards} />
        </div> :
        null
    );
}