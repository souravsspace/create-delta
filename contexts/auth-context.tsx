"use client";

import { UserExtended } from "@/types";
import { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  user: UserExtended | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: UserExtended | null;
}) => {
  const value = {
    user: initialUser || null,
    isLoading: false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
