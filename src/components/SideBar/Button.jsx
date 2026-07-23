function Button({onClick, label, img, imgAlt, className}){
return(
    <button className={className} onClick={onClick}> <img src={img} alt={imgAlt} /> <p>{label}</p></button>
)    
}

export default Button