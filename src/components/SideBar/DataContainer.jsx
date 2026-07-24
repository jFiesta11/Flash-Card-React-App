function DataContainer({cards = []}){
    return(
        <div className="dataContainer">
            <ul>
                {cards.length > 0 ? (
                    cards.map((card, index) => (
                        <li key={`${card.questions}-${index}`}>
                            <strong>{card.questions}</strong> - {card.answers}
                        </li>
                    ))
                ) : (
                    <li>No cards yet</li>
                )}
            </ul>
        </div>
    )
}

export default DataContainer