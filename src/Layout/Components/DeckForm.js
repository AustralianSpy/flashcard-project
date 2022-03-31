import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { createDeck, updateDeck } from '../../utils/api';

export default function DeckForm({ deck = {id: '', name: '', description: ''}, handleChange }) {
    const history = useHistory();
    const { path } = useRouteMatch();

    // submission and cancellation handlers for form.
    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const submitData = async () => {
            if (path === '/decks/new'){
                try {
                    const response = await createDeck(deck, abortController.signal);
                    history.push(`/decks/${response.id}`);
                } catch (error) {
                    throw error;
                }
            } else if (path === '/decks/:deckId/edit'){
                try {
                    const response = await updateDeck(deck, abortController.signal);
                    history.push(`/decks/${response.id}`);
                } catch (error) {
                    throw error;
                }
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
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className='text-uppercase font-weight-bold'>Deck Name:</label>
                    <input type="text" className='form-control' id='name' name='name' onChange={handleChange} value={deck.name} />
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
    );
}