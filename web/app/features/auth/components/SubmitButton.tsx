import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
  loadingLabel: string;
}

export default function SubmitButton({ isLoading, label, loadingLabel }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full rounded-lg bg-blue-main px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:bg-blue-dark hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isLoading ? loadingLabel : label}
      {!isLoading && <ArrowRight className="h-4 w-4" />}
    </button>
  );
}

