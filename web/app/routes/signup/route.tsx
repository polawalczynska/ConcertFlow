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
import type { RegisterRequestRoleEnum } from "~/api";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<RegisterRequestRoleEnum | "">("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerMutation = useRegister();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      // TODO: Show error message
      return;
    }

    if (!role) {
      // TODO: Show error message
      return;
    }

    registerMutation.mutate({
      firstName,
      lastName,
      email,
      role: role as RegisterRequestRoleEnum,
      password,
      confirmPassword,
    });
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
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <NameInput
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  placeholder="Johnson"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <EmailInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <RoleSelect
                value={role}
                onChange={(e) => setRole(e.target.value as RegisterRequestRoleEnum | "")}
              />

              <PasswordInput
                id="password"
                name="password"
                label="Password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
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

