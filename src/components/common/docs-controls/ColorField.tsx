interface ColorFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  description?: string;
  presets?: { value: string; label: string }[];
}

export function ColorField({ value, onChange, label, description, presets }: ColorFieldProps) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">{label}</label>}
      {description && <p className="text-xs text-gray-400">{description}</p>}
      <div className="flex items-center space-x-3 mb-2">
        <input
          type="color"
          aria-label={label ?? "색상"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-8 border border-gray-600 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          aria-label={`${label ?? "색상"} 코드`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-1 text-sm border border-gray-600 rounded bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
          placeholder="#ffffff"
        />
      </div>
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {presets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => onChange(preset.value)}
              className="w-6 h-6 rounded border border-gray-600 hover:scale-110 transition-transform"
              style={{ backgroundColor: preset.value }}
              title={preset.label}
              aria-label={preset.label}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorField;
