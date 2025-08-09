<<<<<<< HEAD
// components/ui/dialog.tsx

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = (props: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>) => (
  <DialogPrimitive.Portal {...props} />
);

=======
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = (props: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal {...props} />
)

DialogPortal.displayName = DialogPrimitive.Portal.displayName
>>>>>>> f0d0b4de36e650153fc613de3e3a748c7075f76a

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
<<<<<<< HEAD
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-100",
=======
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
>>>>>>> f0d0b4de36e650153fc613de3e3a748c7075f76a
      className
    )}
    {...props}
  />
<<<<<<< HEAD
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
=======
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName
>>>>>>> f0d0b4de36e650153fc613de3e3a748c7075f76a

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
<<<<<<< HEAD
        "fixed z-50 left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-lg focus:outline-none",
=======
        "fixed z-50 grid w-full max-w-lg scale-100 gap-4 border bg-white p-6 opacity-100 shadow-lg animate-in dark:bg-gray-900 sm:rounded-lg",
        "data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 data-[state=open]:sm:slide-in-from-top-10",
>>>>>>> f0d0b4de36e650153fc613de3e3a748c7075f76a
        className
      )}
      {...props}
    >
      {children}
<<<<<<< HEAD
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
        <X className="h-5 w-5" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";
=======
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#670D2F] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent dark:ring-offset-gray-900">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"
>>>>>>> f0d0b4de36e650153fc613de3e3a748c7075f76a

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
<<<<<<< HEAD
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
=======
))
DialogTitle.displayName = DialogPrimitive.Title.displayName
>>>>>>> f0d0b4de36e650153fc613de3e3a748c7075f76a

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
<<<<<<< HEAD
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
=======
))
DialogDescription.displayName = DialogPrimitive.Description.displayName
>>>>>>> f0d0b4de36e650153fc613de3e3a748c7075f76a

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
<<<<<<< HEAD
};
=======
}
>>>>>>> f0d0b4de36e650153fc613de3e3a748c7075f76a
