import { Toaster } from "react-hot-toast";

import { ReactNode } from "react";

export default function NotificationToaster({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
