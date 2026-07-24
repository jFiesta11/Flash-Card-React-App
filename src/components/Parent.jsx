import MainContent from "./MainContent/MainContent";
import Sidebar from "./SideBar/Sidebar"
import card from "../data/questions.json"
import { useEffect, useState } from "react";

function Parent(){
    const [openSideBar, setOpenSidebar] = useState(false)

    useEffect(() => {
        if (!openSideBar) return

        const handleClickOutside = (event) => {
            const clickedInsideSidebar = event.target.closest("[data-sidebar]")
            const clickedOpenButton = event.target.closest(".open-sidebar")

            if (!clickedInsideSidebar && !clickedOpenButton) {
                setOpenSidebar(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [openSideBar])

    return (
        <>
            <MainContent card={card} onOpenSidebar={() => setOpenSidebar((open) => !open)} />
           
            <Sidebar isOpen={openSideBar} onCloseSidebar={() => setOpenSidebar(false)} />
        </>
    )
}

export default Parent;