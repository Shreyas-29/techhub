"use client";

import React, { useState } from 'react'
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Icons from "./icons";
import Link from "next/link";
import { motion } from "framer-motion";

const SignUpForm = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignIn = async () => {
        setIsLoading(true);

        try {
            await signIn("google");
        } catch (error) {
            toast.error("There was an error signing in. Please try again.");
        } finally {
            setIsLoading(false);
            router.push("/");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center max-w-sm mx-auto"
        >
            <div className='flex flex-col space-y-3 text-center'>
                <Icons.logo className='w-12 h-12 mx-auto' />
                <h1 className='text-2xl font-semibold tracking-tight'>
                    Sign Up to TechHub
                </h1>
                <p className='text-sm max-w-xs mx-auto text-muted-foreground'>
                    By continuing, you are setting up a TechHub account and agree to our Terms of Service and Privacy Policy.
                </p>

                <Button className="w-full text-base font-normal" onClick={handleSignIn}>
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
                    ) : (
                        <>
                            <Icons.google className="w-5 h-5 mr-2" />
                            <span className="flex-1">
                                Continue with google
                            </span>
                        </>
                    )}
                </Button>

                <p className='px-8 text-center text-sm text-zinc-700'>
                    Already a member?{' '}
                    <Link href='/signin' className='hover:text-zinc-900 text-sm transition'>
                        Sign In
                    </Link>
                </p>
            </div>
        </motion.div>
    )
}

export default SignUpForm
