import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { useState } from "react";
import BrandHeader from "~/components/auth/BrandHeader";
import AuthCard from "~/components/auth/AuthCard";
import AuthFormHeader from "~/components/auth/AuthFormHeader";
import NameInput from "./components/NameInput";
import EmailInput from "~/components/auth/EmailInput";
import RoleSelect from "./components/RoleSelect";
import PasswordInput from "~/components/auth/PasswordInput";
import SubmitButton from "~/components/auth/SubmitButton";
import AuthLink from "~/components/auth/AuthLink";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const role = formData.get("role");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  console.log("Sign up attempt:", { firstName, lastName, email, role });

  return null;
}

export default function SignUpPage() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            <Form method="post" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <NameInput
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  placeholder="Kate"
                />
                <NameInput
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  placeholder="Johnson"
                />
              </div>

              <EmailInput />

              <RoleSelect />

              <PasswordInput
                id="password"
                name="password"
                label="Password"
                placeholder="Create a strong password"
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              <SubmitButton
                isLoading={isSubmitting}
                label="Create account"
                loadingLabel="Creating account..."
              />
            </Form>
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

