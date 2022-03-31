import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../../utils/api';

export default function EditDeck({ nav }) {
    const [deck, setDeck] = useState({ id: '', name: '', description: ''});
    const { deckId } = useParams();
    const { url } = useRouteMatch();
    const history = useHistory();

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

    // handlers for form, including controlled inputs and submission.
    const handleChange = ({ target }) => {
        setDeck({
            ...deck,
            [target.name]: target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const submitData = async () => {
            try {
                const response = await updateDeck(deck, abortController.signal);
                history.push(`/decks/${response.id}`);
            } catch (error) {
                throw error;
            }
        }
        submitData();

        return () => { abortController.abort() };
    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.goBack();
    }

    return (
        <div className="container mb-5">
            <h2 className='mb-4'>Edit the deck.</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className='text-uppercase font-weight-bold'>Deck Name:</label>
                    <input type="text" className='form-control' id='name' onChange={handleChange} value={deck.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className='text-uppercase font-weight-bold'>Description:</label>
                    <textarea className='form-control' name="description" id="description" cols="30" rows="10" onChange={handleChange} value={deck.description}>
                    </textarea>
                </div>
                <div className="form-group">
                    <button className="btn btn-secondary mr-2" onClick={handleCancel}>Cancel</button>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}