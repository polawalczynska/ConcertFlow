import { useState, FormEvent } from "react";
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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const loginMutation = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

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

    // Submit if validation passes
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <EmailInput
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
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
