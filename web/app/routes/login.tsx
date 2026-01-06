import { useState } from "react";
import { BrandHeader, AuthCard, AuthFormHeader, AuthLink, LoginForm } from "~/features/auth/components";
import { useLogin } from "~/features/auth/hooks";
import { type LoginFormData, extractApiError } from "~/shared/utils";

export default function LoginPage() {
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  
  const loginMutation = useLogin();
  
  const handleSubmit = (data: LoginFormData) => {
    setErrors({});
    setGeneralError(null);
    
    loginMutation.mutate(data, {
      onError: (error) => {
        const apiError = extractApiError(error);
        if (apiError) {
          if (apiError.field) {
            setErrors((prev) => ({
              ...prev,
              [apiError.field as keyof LoginFormData]: apiError.message,
            }));
            setGeneralError(null);
          } else {
            setGeneralError(apiError.message);
            setErrors({});
          }
        } else {
          setGeneralError("An unexpected error occurred. Please try again.");
        }
      },
      onSuccess: () => {
        setErrors({});
        setGeneralError(null);
      },
    });
  };

  const handleFieldChange = (field?: keyof LoginFormData) => {
    if (field) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
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
