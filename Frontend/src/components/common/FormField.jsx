function FormField({ label, name, value, onChange, type = "text", as = "input", options = [], required = false, minLength, rows = 3, placeholder = "", id, disabled = false }) {
  const fieldId = id || name;
  const sharedProps = {
    id: fieldId,
    name,
    value,
    onChange,
    required,
    disabled,
    placeholder,
    ...(minLength ? { minLength } : {})
  };

  return (
    <div className="admin-form-group">
      <label htmlFor={fieldId}>{label}</label>
      {as === "textarea" ? (
        <textarea {...sharedProps} rows={rows} />
      ) : as === "select" ? (
        <select {...sharedProps}>
          {options.map((option) => (
            <option key={String(option.value)} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...sharedProps} type={type} />
      )}
    </div>
  );
}

export default FormField;
