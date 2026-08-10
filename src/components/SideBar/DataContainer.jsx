import { useState } from "react";
import remove_data_btn from "../../assets/images/remove-data.svg";
import show_ans from "../../assets/images/show-ans.svg";
import hide_ans from "../../assets/images/hide-ans.svg";
import more_options from "../../assets/images/more.svg";

function DataContainer({
  cards = [],
  onRemoveCard,
  onRevealAll,
  onClearAll,
  revealedAnswers,
  onToggleAnswer,
}) {
  return (
    <div className="dataContainer">
      <h3 className="saved-cards">Saved cards: {cards.length}</h3>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <button
          className="cards-management"
          type="button"
          onClick={onRevealAll}
        >
          <img src={show_ans} alt="show-ans" /> Reveal all answers
        </button>
        <button className="cards-management" type="button" onClick={onClearAll}>
          <img src={remove_data_btn} alt="delete-all" />
          Delete all data
        </button>
      </div>
      <ol>
        {cards.length > 0 ? (
          cards.map((card, index) => {
            const isRevealed = revealedAnswers[index];

            return (
              <li key={`${card.question}-${index}`}>
                <strong>{card.question}</strong>
                <br />
                <button
                  type="button"
                  onClick={() => onToggleAnswer(index)}
                  style={{ marginTop: "6px" }}
                  className="show-hide-data"
                >
                  {isRevealed ? (
                    <img src={hide_ans} alt="hide" />
                  ) : (
                    <img src={show_ans} alt="show" />
                  )}
                </button>
                {isRevealed && <p>Answer: {card.answer}</p>}
                <button
                  className="remove-btn"
                  type="button"
                  onClick={() => onRemoveCard(index)}
                  style={{ marginLeft: "8px" }}
                >
                  <img src={remove_data_btn} alt="remove-data" />
                </button>
              </li>
            );
          })
        ) : (
          <li>No cards yet</li>
        )}
      </ol>
    </div>
  );
}

export default DataContainer;
