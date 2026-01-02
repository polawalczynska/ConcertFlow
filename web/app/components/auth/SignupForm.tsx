import { useState, FormEvent } from "react";
import NameInput from "~/routes/signup/components/NameInput";
import EmailInput from "~/components/auth/EmailInput";
import PhoneInput from "~/components/auth/PhoneInput";
import RoleSelect from "~/routes/signup/components/RoleSelect";
import PasswordInput from "~/components/auth/PasswordInput";
import SubmitButton from "~/components/auth/SubmitButton";
import { registerSchema, type RegisterFormData } from "~/lib/validations/auth";

interface SignupFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading?: boolean;
  errors?: Partial<Record<keyof RegisterFormData, string>>;
  generalError?: string | null;
  onFieldChange?: () => void;
}

export default function SignupForm({
  onSubmit,
  isLoading = false,
  errors = {},
  generalError,
  onFieldChange,
}: SignupFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"" | "COORDINATOR" | "BUDGET_MANAGER" | "TECHNICAL_MANAGER">("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationErrors({});

    const result = registerSchema.safeParse({
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      role,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegisterFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof RegisterFormData] = issue.message;
        }
      });
      setValidationErrors(fieldErrors);
      return;
    }

    onSubmit(result.data);
  };

  const clearFieldError = (field: keyof RegisterFormData) => {
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    onFieldChange?.();
  };

  const allErrors = { ...validationErrors, ...errors };

  return (
    <>
      {generalError && (
        <div className="mb-4 rounded-lg border border-red-500 bg-red-50 p-3 text-sm text-red-700">
          {generalError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <NameInput
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="Kate"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              clearFieldError("firstName");
            }}
            error={allErrors.firstName}
          />
          <NameInput
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Johnson"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              clearFieldError("lastName");
            }}
            error={allErrors.lastName}
          />
        </div>

        <EmailInput
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearFieldError("email");
          }}
          error={allErrors.email}
        />

        <PhoneInput
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            clearFieldError("phone");
          }}
          error={allErrors.phone}
        />

        <RoleSelect
          value={role}
          onChange={(e) => {
            setRole(e.target.value as typeof role);
            clearFieldError("role");
          }}
          error={allErrors.role}
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearFieldError("password");
          }}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          error={allErrors.password}
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            clearFieldError("confirmPassword");
          }}
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          error={allErrors.confirmPassword}
        />

        <SubmitButton
          isLoading={isLoading}
          label="Create account"
          loadingLabel="Creating account..."
        />
      </form>
    </>
  );
}

