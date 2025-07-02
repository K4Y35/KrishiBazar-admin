import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";
import type { PropsWithChildren } from "react";
import { metadata } from './metadata';
import ClientLayout from './client-layout';

export { metadata };

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
