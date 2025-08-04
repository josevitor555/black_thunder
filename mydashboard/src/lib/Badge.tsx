import * as React from "react";

export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
}) {
  let badgeClass = "badge-default";
  if (variant === "success") badgeClass = "badge-success";
  if (variant === "warning") badgeClass = "badge-warning";
  if (variant === "danger") badgeClass = "badge-danger";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${badgeClass}`}
    >
      {children}
    </span>
  );
} 