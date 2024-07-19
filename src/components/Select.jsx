const Select = ({ defaultOption, optionArray, id, error, value, onChange }) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>Category</label>
      <select id={id} name="category" value={value} onChange={onChange}>
        <option hidden>{defaultOption}</option>
        {optionArray.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <p className="error">{error}</p>
    </div>
  );
};

export default Select;
