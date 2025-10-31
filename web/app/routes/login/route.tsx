import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { useState } from "react";
import BrandHeader from "~/components/auth/BrandHeader";
import AuthCard from "~/components/auth/AuthCard";
import AuthFormHeader from "~/components/auth/AuthFormHeader";
import EmailInput from "~/components/auth/EmailInput";
import PasswordInput from "~/components/auth/PasswordInput";
import SubmitButton from "~/components/auth/SubmitButton";
import AuthLink from "~/components/auth/AuthLink";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("Login attempt:", { email });

  return null;
}

export default function LoginPage() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showPassword, setShowPassword] = useState(false);

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
            <Form method="post" className="space-y-4">
              <EmailInput />
              <PasswordInput
                id="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
              <SubmitButton
                isLoading={isSubmitting}
                label="Sign in"
                loadingLabel="Signing in..."
              />
            </Form>
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

