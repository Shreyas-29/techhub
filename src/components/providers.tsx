"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

interface Props {
    children: React.ReactNode;
}

const Providers = ({ children }: Props) => {

    const client = new QueryClient();

    return (
        <QueryClientProvider client={client}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </QueryClientProvider>
    );
};

export default Providers;