interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  description?: string;
}

export function SelectField({ value, onChange, options, label, description }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">{label}</label>}
      {description && <p className="text-xs text-gray-400">{description}</p>}
      <select
        aria-label={label ?? "옵션"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-800 text-white">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
