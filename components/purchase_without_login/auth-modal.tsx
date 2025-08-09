// components/auth-modal.tsx
"use client";

import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
 
};

export const AuthModal = ({ open, onClose }: AuthModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-[#0C0C0C] text-black dark:text-white rounded-2xl p-6 w-full max-w-sm shadow-xl space-y-4">
          <Dialog.Title className="text-lg font-bold">You`&apos;`re not logged in</Dialog.Title>
          <p className="text-sm">Please login or register to continue.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => window.location.href = "/sign-in"}>Login</Button>
            <Button className="bg-[#670D2F] hover:bg-[#3A0519] text-white" onClick={() => window.location.href = "/sign-up"}>Sign up</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
