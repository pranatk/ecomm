"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type SubmitButton = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function SubmitButton({
  children,
  className,
  ...props
}: SubmitButton) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      type="submit"
      disabled={pending}
      className={`btn btn-primary ${className}`}
    >
      {pending && <span className="loading loading-dots loading-sm"></span>}
      {!pending && children}
    </button>
  );
}
