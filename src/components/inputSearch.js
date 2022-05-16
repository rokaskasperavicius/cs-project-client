export const InputSearch = ({
    type = "text",
    value,
    onChange,
    placeholder,
    className = "",
  }) => (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      className={"inputSearch" + className}
      placeholder={placeholder}
    />
  );