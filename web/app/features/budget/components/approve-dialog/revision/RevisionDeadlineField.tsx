import { DateTimePicker } from "~/features/concerts/components/DateTimePicker";

interface RevisionDeadlineFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function RevisionDeadlineField({value, onChange}: RevisionDeadlineFieldProps) {
  return (
    <div>
      <DateTimePicker
        value={value}
        onChange={onChange}
        label="Revision Deadline"
      />
      <p className="mt-1 text-xs text-text-secondary">
        The coordinator must submit revisions by this date
      </p>
    </div>
  );
}

