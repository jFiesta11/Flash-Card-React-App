function DataContainer({cards = [], onRemoveCard}){
    return(
        <div className="dataContainer">
            <h3 className="saved-cards">Saved cards: {cards.length}</h3>
            <ol>
                {cards.length > 0 ? (
                    cards.map((card, index) => (
                        <li key={`${card.question}-${index}`}>
                            <strong>{card.question}</strong> <br></br> Answer: {card.answer}
                            <button type="button" onClick={() => onRemoveCard(index)} style={{ marginLeft: "8px" }}>
                                Remove
                            </button>
                        </li>
                    ))
                ) : (
                    <li>No cards yet</li>
                )}
            </ol>
        </div>
    )
}

export default DataContainer