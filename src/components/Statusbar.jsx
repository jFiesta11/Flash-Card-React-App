function Statusbar({item, totalItem}){
    let percentage = Math.round((item/totalItem)*100)
    return(
        <>
        <div className="card-item-count"><h3>{item} / {totalItem}</h3></div>
        <div className="card-progressBar-container">
            <div className="card-progressBar-empty">
                <div className="card-progressBar"  style={{width:`${percentage}%`}}> 
                    <div className="card-progressBar-label"><p>{percentage}%</p></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Statusbar;  