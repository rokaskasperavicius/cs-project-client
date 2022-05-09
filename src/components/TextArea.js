export const TextArea = ({ value, onChange, placeholder, className }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="textarea"
  />
);
