import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

function StudyCard({ cards }) {
  const { deckId } = useParams();
  const history = useHistory();

  const initialState = {
    flipped: false,
    number: 0,
  };

  const [studySession, setStudySession] = useState(initialState);

  const handleFlip = () => {
    setStudySession({ ...studySession, flipped: true });
  };

  const handleNextCard = () => {
    if (studySession.number < cards.length - 1) {
      setStudySession({
        ...studySession,
        number: studySession.number + 1,
        flipped: false,
      });
    } else {
      window.confirm(
        'Restart cards? \n \n Click "cancel" to return to the home page.'
      )
        ? setStudySession(initialState)
        : history.push("/");
    }
  };

  if (cards.length > 2) {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {studySession.number + 1} of {cards.length}
            </h5>
            <p className="card-text">
              {studySession.flipped
                ? cards[studySession.number].back
                : cards[studySession.number].front}
            </p>
            <button
              className="btn btn-secondary"
              onClick={handleFlip}
              style={{ marginRight: "10px" }}
            >
              Flip
            </button>
            {studySession.flipped && (
              <button className="btn btn-primary" onClick={handleNextCard}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Not enough cards</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  }
}

export default StudyCard;
