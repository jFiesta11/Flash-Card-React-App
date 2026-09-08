function Button({
  onClick,
  label,
  img,
  imgAlt,
  className,
  ariaLabel,
  tooltip,
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      data-tooltip={tooltip}
    >
      {" "}
      <img src={img} alt={imgAlt} /> <p>{label}</p>
    </button>
  );
}

export default Button;
