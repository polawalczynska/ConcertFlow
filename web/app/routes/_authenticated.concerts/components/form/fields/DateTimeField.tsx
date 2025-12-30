import { DateTimePicker } from "../../../../../components/DateTimePicker";

interface DateTimeFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function DateTimeField({value, onChange, error}: DateTimeFieldProps) {
  return (
    <div className="sm:col-span-3">
      <DateTimePicker value={value} onChange={onChange} error={error}/>
    </div>
  );
}

