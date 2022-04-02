import React, { useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

export default function StudyCard({ cards }) {
    const history = useHistory();
    const { deckId } = useParams();

    // store initial shape of the state of the card being viewed.
    const initialCard = {
        index: 0,
        info: cards[0],
        front: true,
    };
    const [card, setCard] = useState({...initialCard});

    // toggles between the front and back of the card being viewed. 
    const handleFlip = () => {
        setCard({ ...card, 'front': !card['front'] });
    }

    // sets the card state to the next card in the deck.
    // if the card is the last card in the deck, prompt to study again or go home.
    const handleNext = () => {
        if (card['index'] < (cards.length - 1)){
            setCard({ 
                'index': card.index + 1,
                'info': cards[card.index + 1],
                'front': true,
            });
        } else {
            if (window.confirm('Would you like to study again from the beginning?')){
                window.location.reload();
            } else {
                history.push('/');
            }
        }
    }

    // requires at least 3 cards to begin a study session. if not enough cards, present a screen
    // declaring that, and link to the screen to add a card.
    // otherwise, begin study session. card being studied toggles 'next' button visibility
    // dependent on if the user is viewing the back of the card.
    
    if (cards.length <= 2) {
        return (
            <>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary ml-1 w-30 h-5">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="bi bi-plus mr-2"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    Add Cards
                </Link>
            </>
        );
    }
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">
                        Card {card['index'] + 1} of {cards.length}
                    </h4>
                    <p className="card-text">
                        {
                            (card.front) ?
                                card['info']['front'] :
                                card['info']['back']
                        }
                    </p>
                    <button className="btn btn-secondary w-25" onClick={handleFlip}>
                        Flip
                    </button>
                    {
                        (!card.front) ?
                            <button className="btn btn-primary ml-2 w-25" onClick={handleNext}>
                                Next
                            </button> :
                            null
                    }
                </div>
            </div>
        </>
    );
}