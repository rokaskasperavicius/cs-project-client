export const TextArea = ({ value, onChange, placeholder, className }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={className}
    placeholder={placeholder}
  />
);
