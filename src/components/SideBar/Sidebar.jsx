function Sidebar(isOpen){
    return(
        <div className="sidebar" style={isOpen?{transform: "translateX(900px)"} : {transform: "translateX(-900px)"} }></div>
    )
}