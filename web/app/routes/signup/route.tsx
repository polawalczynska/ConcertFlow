import { useState, FormEvent } from "react";
import BrandHeader from "~/components/auth/BrandHeader";
import AuthCard from "~/components/auth/AuthCard";
import AuthFormHeader from "~/components/auth/AuthFormHeader";
import NameInput from "./components/NameInput";
import EmailInput from "~/components/auth/EmailInput";
import RoleSelect from "./components/RoleSelect";
import PasswordInput from "~/components/auth/PasswordInput";
import SubmitButton from "~/components/auth/SubmitButton";
import AuthLink from "~/components/auth/AuthLink";
import { useRegister } from "~/hooks/useAuth";
import { registerSchema, registerFormDataToRequest, type RegisterFormData } from "~/lib/validations/auth";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"" | "COORDINATOR" | "BUDGET_MANAGER" | "TECHNICAL_MANAGER">("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const registerMutation = useRegister();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const result = registerSchema.safeParse({
      firstName,
      lastName,
      email,
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
      setErrors(fieldErrors);
      return;
    }

    // Submit if validation passes
    const requestData = registerFormDataToRequest(result.data);
    registerMutation.mutate(requestData);
  };

  const clearFieldError = (field: keyof RegisterFormData) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-main via-bg-secondary to-purple-main/5 p-4">
      <div className="w-full max-w-md">
        <BrandHeader subtitle="Start planning amazing concerts today" />

        <AuthCard>
          <AuthFormHeader
            title="Create an account"
            description="Enter your details to get started"
          />
          <div className="p-6 pt-0">
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
                  error={errors.firstName}
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
                  error={errors.lastName}
                />
              </div>

              <EmailInput
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError("email");
                }}
                error={errors.email}
              />

              <RoleSelect
                value={role}
                onChange={(e) => {
                  setRole(e.target.value as typeof role);
                  clearFieldError("role");
                }}
                error={errors.role}
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
                error={errors.password}
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
                error={errors.confirmPassword}
              />

              <SubmitButton
                isLoading={registerMutation.isPending}
                label="Create account"
                loadingLabel="Creating account..."
              />
            </form>
            <AuthLink
              question="Already have an account?"
              linkText="Sign in"
              to="/login"
            />
          </div>
        </AuthCard>
      </div>
    </div>
  );
}
