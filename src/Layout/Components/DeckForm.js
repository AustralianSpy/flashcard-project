import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { updateDeck } from '../../utils/api';

export default function DeckForm({ deckProps = {id: '', name: '', description: ''} }) {
    const [deck, setDeck] = useState({...deckProps});
    const history = useHistory()

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
        <div className="container mt-5">
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