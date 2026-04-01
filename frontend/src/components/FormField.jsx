export default function FormField({ label, name, type = 'number', value, onChange, tooltip, min = 0, max, step = 'any', required = false }) {
  return (
    <div className="group relative">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-surface-300 mb-1.5 group-focus-within:text-primary-400 transition-colors duration-200"
      >
        {label}
        {required && <span className="text-primary-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        required={required}
        className="
          w-full px-4 py-2.5 rounded-xl
          bg-surface-800/60 border border-surface-600/50
          text-white placeholder-surface-500
          focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/60
          hover:border-surface-500/70
          transition-all duration-200
          text-sm
          [appearance:textfield]
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none
        "
        placeholder="0"
      />
      {tooltip && (
        <p className="mt-1 text-xs text-surface-500 italic">{tooltip}</p>
      )}
    </div>
  );
}

export function ToggleField({ label, name, value, onChange, tooltip }) {
  const isOn = Number(value) === 1;

  const handleToggle = () => {
    onChange({ target: { name, value: isOn ? 0 : 1 } });
  };

  return (
    <div className="group relative">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-surface-300 group-focus-within:text-primary-400 transition-colors">
          {label}
        </label>
        <button
          type="button"
          onClick={handleToggle}
          className={`
            relative inline-flex h-7 w-13 items-center rounded-full transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-surface-900
            ${isOn
              ? 'bg-gradient-to-r from-primary-500 to-accent-500 shadow-md shadow-primary-500/30'
              : 'bg-surface-700 hover:bg-surface-600'
            }
          `}
        >
          <span
            className={`
              inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-all duration-300 ease-out
              ${isOn ? 'translate-x-7' : 'translate-x-1'}
            `}
          />
        </button>
      </div>
      {tooltip && (
        <p className="mt-1 text-xs text-surface-500 italic">{tooltip}</p>
      )}
    </div>
  );
}
