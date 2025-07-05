import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "MOJ Admin Panel",
  description: "Content management system for Minds of Josiah Church",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
