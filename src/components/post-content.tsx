"use client";

import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { ExtendedPost } from "@/types/post";
import { Loader2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";


interface Props {
    post: ExtendedPost;
}

const PostContent = ({ post }: Props) => {

    const { data: session } = useSession();

    const user = session?.user;

    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.delete(`/api/post/${post.id}`);
            return data;
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    toast.error("Please login to delete the post");
                }

                if (error.response?.status === 422) {
                    toast.error("You are not authorized to delete this post");
                }

                toast.error("Could not delete the post. Please try again");
            }
        },
        onSuccess: () => {
            toast.success("Post has been deleted!");
            router.refresh();
            router.push("/");
        },
    });

    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-start w-full"
            >
                <div className="flex flex-wrap items-center justify-between w-full">
                    <span className="text-sm text-wrap font-medium text-blue-500">
                        {post.author.name}{" "}
                        <span className="text-muted-foreground">
                            • {moment(post.createdAt).fromNow()} • 1 min read
                        </span>
                    </span>
                    {user?.id === post.author.id && (
                        <Button
                            size="icon"
                            variant="destructive"
                            disabled={isPending}
                            onClick={() => mutate()}
                        >
                            {isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Trash2 className="w-4 h-4" />
                            )}
                        </Button>
                    )}
                </div>
                <h1 className="text-2xl font-semibold md:text-3xl mt-4">
                    {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                    {post.content.split(/[.?!]/)[0]}
                </p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full mt-8"
            >
                <Image
                    src={post.images?.[0]?.url!}
                    alt={post.author.name!}
                    width={400}
                    height={400}
                    layout="responsive"
                    className="object-cover max-h-96 w-full rounded-lg border border-border"
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full mt-8"
            >
                <p className="text-foreground whitespace-pre-line">
                    {post.content}
                </p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-start w-full mt-8"
            >
                <div className="border border-border rounded-lg px-4 md:px-8 py-4 md:py-6 flex flex-col items-start w-full">
                    <h2 className="text-xl font-medium">
                        Explore the world
                    </h2>
                    <p className="text-sm text-neutral-600 mt-2">
                        Learn more about the world and how you can make a difference in your community. We are here to help you grow and learn more about the world around you.
                    </p>
                    <Button size="sm" className="mt-6">
                        <Link href="https://shreyas-sihasane.vercel.app" target="_blank" rel="noopener noreferrer">
                            Explore
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}

export default PostContent
