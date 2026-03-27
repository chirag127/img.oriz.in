import { useCallback, useRef } from "react";

export interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
  unit?: string;
}

export default function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  showValue = true,
  unit = "",
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  return (
    <div className="flex flex-col gap-1.5">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-sm font-medium text-[var(--color-text-main)]">
              {label}
            </label>
          )}
          {showValue && (
            <span className="font-mono text-sm font-semibold text-[var(--color-text-main)]">
              {value}
              {unit}
            </span>
          )}
        </div>
      )}
      <div className="relative h-6 w-full">
        <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-[var(--color-surface-2)]">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-[var(--color-primary)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent"
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
      </div>
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: transform var(--transition-base), box-shadow var(--transition-base);
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: transform var(--transition-base), box-shadow var(--transition-base);
        }
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        input[type="range"]::-moz-range-track {
          background: transparent;
          border: none;
          height: 8px;
        }
        input[type="range"]:focus-visible::-webkit-slider-thumb {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
