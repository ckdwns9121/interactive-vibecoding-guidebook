interface TextAreaFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  description?: string;
  rows?: number;
  placeholder?: string;
}

export function TextAreaField({
  value,
  onChange,
  label,
  description,
  rows = 3,
  placeholder,
}: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">{label}</label>}
      {description && <p className="text-xs text-gray-400">{description}</p>}
      <textarea
        aria-label={label ?? "텍스트"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-600 rounded-md bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none placeholder-gray-400"
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextAreaField;
