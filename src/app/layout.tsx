import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { isThereServerSession } from "@/hooks/session";
import NavBar from "../components/customUi/NavBar";
import "./globals.css";
import QueryProvider from "./provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            "flex",
            "flex-col"
            // "bg-lime-400"
          )}
        >
          <div className="w-[1500px] mx-auto">
            <nav>
              <NavBar />
            </nav>
            <Link href="/" className="m-2">
              로고
            </Link>
            <Link href="/community" className="m-2">
              커뮤니티
            </Link>
            <Button>로그아웃</Button>
            {children}
          </div>
        </body>
      </html>
    </QueryProvider>
  );
}
