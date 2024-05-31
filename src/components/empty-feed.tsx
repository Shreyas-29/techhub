"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from 'react'
import { Button } from "./ui/button";
import Link from "next/link";

const EmptyFeed = () => {

    const MotionImage = motion(Image);

    const MotionButton = motion(Button);

    return (
        <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto absolute inset-0">
            <MotionImage
                src="/designer.svg"
                alt="Image of a developer coding"
                width={400}
                height={400}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="object-cover h-52 w-auto"
            />
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl md:text-4xl font-bold mt-2"
            >
                Join the TechHub Today!
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-4 text-base text-muted-foreground max-w-sm md:max-w-full"
            >
                Please log in to access your personalized post feed and stay updated with the latest content.
            </motion.p>
            <MotionButton
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                variant="subtle"
                className="mt-6"
            >
                <Link href="/">
                    Get Started
                </Link>
            </MotionButton>
        </div>
    )
};

export default EmptyFeed
