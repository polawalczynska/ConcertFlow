import { useState, FormEvent } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import CheckboxInput from "./CheckboxInput";
import SubmitButton from "./SubmitButton";
import { loginSchema, type LoginFormData } from "~/shared/utils";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  errors?: Partial<Record<keyof LoginFormData, string>>;
  generalError?: string | null;
  onFieldChange?: (field?: keyof LoginFormData) => void;
}

export default function LoginForm({
  onSubmit,
  isLoading = false,
  errors = {},
  generalError,
  onFieldChange,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation(); 
    setValidationErrors({});

    const result = loginSchema.safeParse({
      email,
      password,
      rememberMe,
    });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof LoginFormData] = issue.message;
        }
      });
      setValidationErrors(fieldErrors);
      return;
    }

    onSubmit(result.data);
  };

  const allErrors = { ...validationErrors, ...errors };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (validationErrors.email) {
      setValidationErrors((prev) => ({ ...prev, email: undefined }));
    }
    onFieldChange?.("email");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (validationErrors.password) {
      setValidationErrors((prev) => ({ ...prev, password: undefined }));
    }
    onFieldChange?.("password");
  };

  return (
    <>
      {generalError && (
        <div className="mb-4 rounded-lg border border-red-500 bg-red-50 p-3 text-sm text-red-700">
          {generalError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <EmailInput
          value={email}
          onChange={handleEmailChange}
          error={allErrors.email}
        />
        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          error={allErrors.password}
        />
        <CheckboxInput
          id="rememberMe"
          name="rememberMe"
          label="Remember me"
          checked={rememberMe}
          onChange={setRememberMe}
        />
        <SubmitButton
          isLoading={isLoading}
          label="Sign in"
          loadingLabel="Signing in..."
        />
      </form>
    </>
  );
}

