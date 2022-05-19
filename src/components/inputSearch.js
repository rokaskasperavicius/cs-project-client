export const InputSearch = ({
  id = "",
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}) => (
  <input
    id={id}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    type={type}
    className={"inputSearch" + className}
    placeholder={placeholder}
  />
);
