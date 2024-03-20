import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { isThereServerSession } from "@/hooks/session";
import NavBar from "../components/NavBar";
import "./globals.css";
import QueryProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { session } = await isThereServerSession();
  // console.log(session);
  return (
    <QueryProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </QueryProvider>
  );
}
