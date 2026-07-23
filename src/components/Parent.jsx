import MainContent from "./MainContent/MainContent";
import card from "../data/questions.json"
function Parent(){
return (
    <>
        <MainContent card={card} />
    </>
)
    }

export default Parent;