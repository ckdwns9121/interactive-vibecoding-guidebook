interface RangeWithNumberProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label?: string;
  description?: string;
}

export function RangeWithNumber({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  description,
}: RangeWithNumberProps) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-200 uppercase tracking-wide">{label}</label>}
      {description && <p className="text-xs text-gray-400">{description}</p>}
      <div className="flex items-center space-x-3">
        <input
          type="range"
          aria-label={label ?? "값 조절"}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            if (e.target.value !== "") onChange(Math.min(max, Math.max(min, Number(e.target.value))));
          }}
          className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          aria-label={`${label ?? "값"} 직접 입력`}
          value={value}
          onChange={(e) => {
            if (e.target.value !== "") onChange(Math.min(max, Math.max(min, Number(e.target.value))));
          }}
          className="w-16 px-2 py-1 text-sm border border-gray-600 rounded text-center bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
}

export default RangeWithNumber;
