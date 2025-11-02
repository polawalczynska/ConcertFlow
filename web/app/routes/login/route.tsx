import { useState, useEffect } from "react";
import BrandHeader from "~/components/auth/BrandHeader";
import AuthCard from "~/components/auth/AuthCard";
import AuthFormHeader from "~/components/auth/AuthFormHeader";
import AuthLink from "~/components/auth/AuthLink";
import LoginForm from "~/components/auth/LoginForm";
import { useLogin } from "~/hooks/useAuth";
import { type LoginFormData } from "~/lib/validations/auth";
import { extractApiError } from "~/lib/error-utils";

export default function LoginPage() {
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

  const handleSubmit = (data: LoginFormData) => {
    setErrors({});
    setGeneralError(null);
    loginMutation.mutate(data);
  };

  const handleFieldChange = () => {
    setErrors({});
    setGeneralError(null);
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
            <LoginForm
              onSubmit={handleSubmit}
              isLoading={loginMutation.isPending}
              errors={errors}
              generalError={generalError}
              onFieldChange={handleFieldChange}
            />
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
