function Button({onClick, label}){
return(
    <button className="card-btn" onClick={onClick}><p>{label}</p></button>
)    
}

export default Button