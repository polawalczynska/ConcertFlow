import { useState, useEffect } from "react";
import { useUser } from "~/hooks/useUser";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { SettingsHeader } from "./_authenticated.settings/components/SettingsHeader";
import { PersonalInfoSection } from "./_authenticated.settings/components/PersonalInfoSection";
import { AccountInfoSection } from "./_authenticated.settings/components/AccountInfoSection";
import { PasswordSection } from "./_authenticated.settings/components/PasswordSection";
import { RoleSection } from "./_authenticated.settings/components/RoleSection";
import { DangerZoneSection } from "./_authenticated.settings/components/DangerZoneSection";
import { DeleteAccountDialog } from "./_authenticated.settings/components/DeleteAccountDialog";
import { settingsSchema, type SettingsFormData } from "~/lib/validations/auth";

export default function SettingsPage() {
  const { data: user, isLoading } = useUser();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"" | "COORDINATOR" | "BUDGET_MANAGER" | "TECHNICAL_MANAGER">("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof SettingsFormData, string>>>({});

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone("");
      setRole(user.role || "");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setValidationErrors({});
    }
  }, [user]);

  const clearFieldError = (field: keyof SettingsFormData) => {
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = () => {
    setValidationErrors({});

    const result = settingsSchema.safeParse({
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      role,
      currentPassword: currentPassword || undefined,
      newPassword: newPassword || undefined,
      confirmPassword: confirmPassword || undefined,
    });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SettingsFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof SettingsFormData] = issue.message;
        }
      });
      setValidationErrors(fieldErrors);
      return;
    }

    console.log("Saving settings:", { 
      firstName, 
      lastName, 
      email, 
      phone, 
      role,
      ...(newPassword && { password: newPassword })
    });
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    console.log("Deleting account...");
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-text-secondary">Unable to load user information</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-bg-secondary">
      <SettingsHeader />
      
      <div className="max-w-4xl mx-auto space-y-6 mt-6">
        <PersonalInfoSection
          firstName={firstName}
          lastName={lastName}
          onFirstNameChange={(value) => {
            setFirstName(value);
            clearFieldError("firstName");
          }}
          onLastNameChange={(value) => {
            setLastName(value);
            clearFieldError("lastName");
          }}
          errors={{
            firstName: validationErrors.firstName,
            lastName: validationErrors.lastName,
          }}
        />

        <AccountInfoSection
          email={email}
          phone={phone}
          onEmailChange={(value) => {
            setEmail(value);
            clearFieldError("email");
          }}
          onPhoneChange={(value) => {
            setPhone(value);
            clearFieldError("phone");
          }}
          errors={{
            email: validationErrors.email,
            phone: validationErrors.phone,
          }}
        />

        <PasswordSection
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          onCurrentPasswordChange={(value) => {
            setCurrentPassword(value);
            clearFieldError("currentPassword");
          }}
          onNewPasswordChange={(value) => {
            setNewPassword(value);
            clearFieldError("newPassword");
          }}
          onConfirmPasswordChange={(value) => {
            setConfirmPassword(value);
            clearFieldError("confirmPassword");
          }}
          errors={{
            currentPassword: validationErrors.currentPassword,
            newPassword: validationErrors.newPassword,
            confirmPassword: validationErrors.confirmPassword,
          }}
        />

        <RoleSection
          role={role}
          onRoleChange={(value) => {
            setRole(value);
            clearFieldError("role");
          }}
          error={validationErrors.role}
        />

        <DangerZoneSection
          onDeleteAccount={() => setIsDeleteDialogOpen(true)}
        />

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-purple-main hover:bg-purple-main/90">
            Save Changes
          </Button>
        </div>
      </div>

      <DeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        isDeleting={isDeleting}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}

