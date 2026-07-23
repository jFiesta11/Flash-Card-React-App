import SideHeader from "./sideHeader"
import Input from "./Input"
import Button from "./Button"
import DataContainer from "./DataContainer"


function Sidebar({isOpen, onCloseSidebar}){
    return (
        <div
            className="sidebar"
            style={isOpen ? { transform: "translateX(0)" } : { transform: "translateX(-100%)" }}
        >
            <SideHeader onCloseSidebar={onCloseSidebar} />
            <div className="sidebar-content-container">
                <DataContainer />
                <div className="inputs-container">
                    <Input placeholder={"QUESTION"}/>
                    <Input placeholder={"answer"}/>
                    <Button label={"set"}/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar