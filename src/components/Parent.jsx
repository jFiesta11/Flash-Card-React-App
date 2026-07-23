import MainContent from "./MainContent/MainContent";
import Sidebar from "./SideBar/Sidebar"
import card from "../data/questions.json"
import { useState } from "react";

function Parent(){
    const [openSideBar, setOpenSidebar] = useState(false)

    return (
        <>
            <MainContent card={card} onOpenSidebar={() => setOpenSidebar((open) => !open)} />
           
            <Sidebar isOpen={openSideBar} onCloseSidebar={() => setOpenSidebar(false)} />
        </>
    )
}

export default Parent;