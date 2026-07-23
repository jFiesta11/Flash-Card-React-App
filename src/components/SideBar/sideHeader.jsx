import close from "../../assets/images/close-sidebar.svg"
import Button from "./Button";


function SideHeader({onCloseSidebar}){
    return(
        <header className="sideHeader">
            <Button img={close} imgAlt="closeButton" className="sidebar-close-btn" onClick={onCloseSidebar} />
        </header>
    )
}

export default SideHeader;