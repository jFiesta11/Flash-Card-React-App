function Input({value, onChange, name}){
    return(
        <textarea value={value} onChange={onChange} className={name}/>
    )
}

export default Input