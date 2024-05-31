"use client";

import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Icons from "./icons";

interface Props {
    user: User | null;
}

const Navbar = ({ user }: Props) => {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
            className="sticky z-50 top-0 inset-x-0 w-full px-4 md:px-10 h-14 bg-white/40 backdrop-blur-lg border-b border-border"
        >
            <div className="flex items-center justify-between w-full h-full md:max-w-screen-xl mx-auto">
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <Icons.logo className="w-8 h-8" />
                    </Link>
                    <nav className="hidden md:flex items-center space-x-4 pl-12">
                        <Button size="sm" variant="ghost" className="text-neutral-600">
                            <Link href="#">
                                Home
                            </Link>
                        </Button>
                        <Button size="sm" variant="ghost" className="text-neutral-600">
                            <Link href="#">
                                About
                            </Link>
                        </Button>
                        <Button size="sm" variant="ghost" className="text-neutral-600">
                            <Link href="#">
                                Blog
                            </Link>
                        </Button>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-sm text-muted-foreground capitalize">
                                Hello, {user.name}
                            </span>
                            <Button size="sm" asChild>
                                <Link href="/post/create">
                                    Create Post
                                </Link>
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => signOut()}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button size="sm" asChild variant="ghost" className="text-neutral-600">
                                <Link href="/signin">
                                    Login
                                </Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href="/signup">
                                    Sign Up
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </motion.header>
    )
}

export default Navbar
