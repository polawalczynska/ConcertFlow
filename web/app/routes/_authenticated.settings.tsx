import { useState, useEffect } from "react";
import { useUser } from "~/shared/hooks/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "~/components/ui/Button";
import { SettingsHeader } from "~/features/settings/components/SettingsHeader";
import { PersonalInfoSection } from "~/features/settings/components/PersonalInfoSection";
import { AccountInfoSection } from "~/features/settings/components/AccountInfoSection";
import { PasswordSection } from "~/features/settings/components/PasswordSection";
import { RoleSection } from "~/features/settings/components/RoleSection";
import { DangerZoneSection } from "~/features/settings/components/DangerZoneSection";
import { DeleteAccountDialog } from "~/features/settings/components/DeleteAccountDialog";
import { settingsSchema, type SettingsFormData } from "~/shared/utils/validations/auth";
import { userApi } from "~/lib/api-client";
import { extractApiError } from "~/shared/utils/helpers/error";
import type { UpdateUserRequest, UserResponse, UserResponseRoleEnum } from "~/api";
import { clearTokens } from "~/shared/utils/helpers/token-storage";

export default function SettingsPage() {
  const { data: user, isLoading } = useUser();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"" | "COORDINATOR" | "BUDGET_MANAGER" | "TECHNICAL_MANAGER">("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof SettingsFormData, string>>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
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
    setApiError(null);
  };

  const updateUserMutation = useMutation<UserResponse, Error, UpdateUserRequest>({
    mutationFn: async (request: UpdateUserRequest): Promise<UserResponse> => {
      const response = await userApi.updateCurrentUser(request);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user", "me"], data);
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setApiError(null);
    },
    onError: (error) => {
      const apiError = extractApiError(error);
      if (apiError?.field) {
        setValidationErrors((prev) => ({
          ...prev,
          [apiError.field as keyof SettingsFormData]: apiError.message || "Validation error",
        }));
      } else {
        setApiError(apiError?.message || "Failed to update settings. Please try again.");
      }
    },
  });

  const handleSave = () => {
    setValidationErrors({});
    setApiError(null);

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

    const request: UpdateUserRequest = {
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      email: result.data.email,
      phone: result.data.phone,
      role: result.data.role as UserResponseRoleEnum,
      currentPassword: result.data.currentPassword || undefined,
      newPassword: result.data.newPassword || undefined,
      confirmPassword: result.data.confirmPassword || undefined,
    };

    updateUserMutation.mutate(request);
  };

  const deleteAccountMutation = useMutation({
    mutationFn: async (): Promise<void> => {
      await userApi.deleteAccount();
    },
    onSuccess: () => {
      
      clearTokens();
      queryClient.clear();
      
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
    onError: () => {
      setIsDeleting(false);
    },
  });

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    deleteAccountMutation.mutate();
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
        {apiError && (
          <div className="rounded-lg border border-red-500 bg-red-50 p-3 text-sm text-red-700">
            {apiError}
          </div>
        )}
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
          <Button 
            onClick={handleSave} 
            className="bg-pink-main hover:bg-pink-main/90"
            disabled={updateUserMutation.isPending}
          >
            {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
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

