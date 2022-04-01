import React from 'react';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { updateCard, createCard } from '../../utils/api';

export default function CardForm({ card = {front: '', back: '', deckId: ''}, handleChange }) {
    const history = useHistory();
    const { path } = useRouteMatch();
    const { deckId } = useParams();

    // submission and cancellation handlers for form.
    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const submitData = async () => {
            if (path === '/decks/:deckId/cards/new'){
                try {
                    const response = await createCard(deckId, card, abortController.signal);
                    history.push(`/decks/${response.deckId}`);
                } catch (error) {
                    throw error;
                }
            } else if (path === '/decks/:deckId/cards/:cardId/edit'){
                try {
                    const response = await updateCard(card, abortController.signal);
                    history.push(`/decks/${response.deckId}`);
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
            <form onSubmit={handleSubmit} className='mb-3'>
                <div className="form-group">
                    <label htmlFor="front" className='text-uppercase font-weight-bold'>Card Front:</label>
                    <textarea className='form-control' id='front' name='front' cols="30" rows="5" onChange={handleChange} value={card.front} />
                </div>
                <div className="form-group">
                    <label htmlFor="back" className='text-uppercase font-weight-bold'>Card Back:</label>
                    <textarea className='form-control' name="back" id="back" cols="30" rows="5" onChange={handleChange} value={card.back} />
                </div>
                <div className="form-group">
                    <button className="btn btn-secondary mr-2" onClick={handleCancel}>Cancel</button>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
    );
}