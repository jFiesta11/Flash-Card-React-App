function Input({ value, onChange, name, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={name}
      placeholder={placeholder}
    />
  );
}

export default Input;
