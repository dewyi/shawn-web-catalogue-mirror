import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";

export const metadata: Metadata = {
  title: "ShawnShop - E-Commerce Store",
  description: "Your one-stop shop for everything you need",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
