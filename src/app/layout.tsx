import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import QueryProvider from "./provider";
import NavBar from "@/components/customUi/navUi/NavBar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Fill ur Pill",
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
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            "flex",
            "flex-col"
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={["green", "yellow", "orange", "rose", "light", "dark"]}
            disableTransitionOnChange
          >
            <NavBar />
            <div className="max-w-[1500px] w-full mx-auto px-10">
              {children}
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
