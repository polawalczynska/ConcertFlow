interface CheckboxInputProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CheckboxInput({
  id,
  name,
  label,
  checked,
  onChange,
}: CheckboxInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 appearance-none rounded border border-border-light bg-bg-main focus:outline-none focus:ring-0 checked:border-pink-main"
        />
        {checked && (
          <svg
            className="absolute left-0 top-0 h-4 w-4 pointer-events-none"
            fill="none"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 4.5L6 12L2.5 8.5"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <label
        htmlFor={id}
        className="text-sm font-medium text-text-primary cursor-pointer select-none"
      >
        {label}
      </label>
    </div>
  );
}

