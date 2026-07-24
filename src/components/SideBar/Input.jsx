function Input({placeholder, value, onChange, name}){
    return(
        <input type="text" placeholder={placeholder} value={value} onChange={onChange} name={name}/>
    )
}

export default Input