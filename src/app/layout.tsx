import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const font = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Techhub",
    description: "Techhub is a community of developers who are passionate about software development.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getAuthSession();

    return (
        <html lang="en">
            <Providers>
                <body className={cn(
                    "min-h-screen bg-background text-foreground antialiased",
                    font.className
                )}>
                    <Toaster richColors theme="light" />
                    <Navbar user={session?.user!} />
                    {children}
                </body>
            </Providers>
        </html>
    );
};
