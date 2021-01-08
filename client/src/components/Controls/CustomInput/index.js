import "./customInput.css";

function CustomInput({
  className,
  value,
  setValue,
  placeholder,
  search = false,
  searchIconStyle,
  filter = () => {},
}) {
  return (
    <div className={`customInput__cantainer ${className}`}>
      <input
        className={`${search ? "pl" : ""}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyUpCapture={() => filter()}
        required
      />
      {search ? (
        <div className={`customInput__searchIcon flex_row ${searchIconStyle}`}>
          <img src="images/searchIcon.svg" alt="searchingIcon" />
        </div>
      ) : null}
    </div>
  );
}

export default CustomInput;
