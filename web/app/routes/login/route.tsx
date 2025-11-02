import { useState, FormEvent, useEffect } from "react";
import BrandHeader from "~/components/auth/BrandHeader";
import AuthCard from "~/components/auth/AuthCard";
import AuthFormHeader from "~/components/auth/AuthFormHeader";
import EmailInput from "~/components/auth/EmailInput";
import PasswordInput from "~/components/auth/PasswordInput";
import CheckboxInput from "~/components/auth/CheckboxInput";
import SubmitButton from "~/components/auth/SubmitButton";
import AuthLink from "~/components/auth/AuthLink";
import { useLogin } from "~/hooks/useAuth";
import { loginSchema, type LoginFormData } from "~/lib/validations/auth";
import { extractApiError } from "~/lib/error-utils";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const loginMutation = useLogin();

  useEffect(() => {
    if (loginMutation.error) {
      const apiError = extractApiError(loginMutation.error);
      if (apiError) {
        if (apiError.field) {
          setErrors((prev) => ({
            ...prev,
            [apiError.field as keyof LoginFormData]: apiError.message,
          }));
        } else {
          setGeneralError(apiError.message);
          setErrors({});
        }
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  }, [loginMutation.error]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

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
      setErrors(fieldErrors);
      return;
    }

    loginMutation.mutate(result.data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-main via-bg-secondary to-purple-main/5 p-4">
      <div className="w-full max-w-md">
        <BrandHeader subtitle="Plan and manage concerts with ease" />

        <AuthCard>
          <AuthFormHeader
            title="Welcome back"
            description="Sign in to your account to continue"
          />
          <div className="p-6 pt-0">
            {generalError && (
              <div className="mb-4 rounded-lg border border-red-500 bg-red-50 p-3 text-sm text-red-700">
                {generalError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <EmailInput
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                  if (generalError) setGeneralError(null);
                }}
                error={errors.email}
              />
              <PasswordInput
                id="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                  if (generalError) setGeneralError(null);
                }}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                error={errors.password}
              />
              <CheckboxInput
                id="rememberMe"
                name="rememberMe"
                label="Remember me"
                checked={rememberMe}
                onChange={setRememberMe}
              />
              <SubmitButton
                isLoading={loginMutation.isPending}
                label="Sign in"
                loadingLabel="Signing in..."
              />
            </form>
            <AuthLink
              question="Don't have an account?"
              linkText="Sign up"
              to="/signup"
            />
          </div>
        </AuthCard>
      </div>
    </div>
  );
}
