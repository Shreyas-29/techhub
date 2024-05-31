import React from 'react'
import Link from "next/link"
import { Button } from "./ui/button"

const Footer = () => {
    return (
        <footer className="w-full h-auto md:h-14 border-t border-border sticky bottom-0 inset-x-0 bg-background px-4 md:px-8">
            <div className="flex flex-col text-center md:text-start md:flex-row gap-2 md:gap-0 items-center justify-between w-full h-full">
                <span className="text-base font-medium text-primary/80 select-none">
                    TechHub @{new Date().getFullYear()}
                </span>
                <div className="flex items-center space-x-4">
                    <Button size="sm" variant="ghost" className="text-neutral-600">
                        <Link href="#">
                            Privacy Policy
                        </Link>
                    </Button>
                    <Button size="sm" variant="ghost" className="text-neutral-600">
                        <Link href="#">
                            Terms of Service
                        </Link>
                    </Button>
                </div>
            </div>
        </footer>
    )
}

export default Footer
