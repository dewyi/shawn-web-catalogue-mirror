import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - ShawnShop",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex min-h-[80vh] items-center justify-center">{children}</div>;
}
