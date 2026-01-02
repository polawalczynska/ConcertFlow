import { useState } from "react";
import type { UserResponse } from "~/api";

export function useUserSearch() {
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundUser, setFoundUser] = useState<UserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchUser = async (searchEmail: string) => {
    if (!searchEmail || !searchEmail.includes("@")) {
      setFoundUser(null);
      setError(null);
      return;
    }

    setIsSearching(true);
    setError(null);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const mockUser: UserResponse = {
        id: 1,
        email: searchEmail,
        firstName: "John",
        lastName: "Doe",
        role: "BUDGET_MANAGER" as const,
        active: true,
      };
      
      setFoundUser(mockUser);
    } catch (err) {
      setError("User not found. Please check the email address.");
      setFoundUser(null);
    } finally {
      setIsSearching(false);
    }
  };

  const reset = () => {
    setEmail("");
    setFoundUser(null);
    setError(null);
    setIsSearching(false);
  };

  return {
    email,
    setEmail,
    isSearching,
    foundUser,
    error,
    searchUser,
    reset,
  };
}

