import { useState } from "react";

function Card({click,front, back, showAnswer}){
return(
    <div onClick={click} className={showAnswer ? "card" :  "card flip"}>
        {showAnswer && <div className="frontFace"><p>{front}</p></div>}

        {!showAnswer && <div className="backFace"><h1>{back}</h1></div>}
    </div>    
)
}

export default Card;
