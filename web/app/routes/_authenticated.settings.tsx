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

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone("");
      setRole(user.role || "");
    }
  }, [user]);

  const handleSave = () => {
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
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
        />

        <AccountInfoSection
          email={email}
          phone={phone}
          onEmailChange={setEmail}
          onPhoneChange={setPhone}
        />

        <PasswordSection
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          onCurrentPasswordChange={setCurrentPassword}
          onNewPasswordChange={setNewPassword}
          onConfirmPasswordChange={setConfirmPassword}
        />

        <RoleSection
          role={role}
          onRoleChange={setRole}
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

