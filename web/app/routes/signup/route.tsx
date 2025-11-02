import { useState, useEffect } from "react";
import BrandHeader from "~/components/auth/BrandHeader";
import AuthCard from "~/components/auth/AuthCard";
import AuthFormHeader from "~/components/auth/AuthFormHeader";
import AuthLink from "~/components/auth/AuthLink";
import SignupForm from "~/components/auth/SignupForm";
import { useRegister } from "~/hooks/useAuth";
import { registerFormDataToRequest, type RegisterFormData } from "~/lib/validations/auth";
import { extractApiError } from "~/lib/error-utils";

export default function SignUpPage() {
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const registerMutation = useRegister();

  useEffect(() => {
    if (registerMutation.error) {
      const apiError = extractApiError(registerMutation.error);
      if (apiError) {
        if (apiError.field) {
          setErrors((prev) => ({
            ...prev,
            [apiError.field as keyof RegisterFormData]: apiError.message,
          }));
          setGeneralError(null);
        } else {
          setGeneralError(apiError.message);
          setErrors({});
        }
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  }, [registerMutation.error]);

  const handleSubmit = (data: RegisterFormData) => {
    setErrors({});
    setGeneralError(null);
    const requestData = registerFormDataToRequest(data);
    registerMutation.mutate(requestData);
  };

  const handleFieldChange = () => {
    setErrors({});
    setGeneralError(null);
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
            <SignupForm
              onSubmit={handleSubmit}
              isLoading={registerMutation.isPending}
              errors={errors}
              generalError={generalError}
              onFieldChange={handleFieldChange}
            />
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
