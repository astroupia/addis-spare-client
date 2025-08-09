// components/auth-guard.tsx
"use client";

import { ReactNode, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { AuthModal } from "@/components/purchase_without_login/auth-modal";

type AuthGuardProps = {
  children: (trigger: () => void) => ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleAction = () => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }
    
  };

  return (
    <>
      {children(handleAction)}
      <AuthModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
