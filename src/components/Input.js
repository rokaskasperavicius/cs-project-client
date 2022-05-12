export const Input = ({
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
    className={"input" + className}
    placeholder={placeholder}
  />
);
