import { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-navy-950 flex items-center justify-center overflow-y-auto">
      {children}
    </div>
  );
}
