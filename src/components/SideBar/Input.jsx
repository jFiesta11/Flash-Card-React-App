function Input({ value, onChange, name, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={name}
      placeholder={placeholder}
      maxLength={100}
    />
  );
}

export default Input;
