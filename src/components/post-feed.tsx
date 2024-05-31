"use client";

import { Button } from "@/components/ui/button";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { ExtendedPost } from "@/types/post";
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowRight, Loader2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from 'react';
import { motion } from "framer-motion";

interface Props {
    initialPosts: ExtendedPost[];
}

const PostFeed = ({ initialPosts }: Props) => {

    const MotionLink = motion(Link);

    const MotionImage = motion(Image);

    const MotionButton = motion(Button);

    const lastPostRef = useRef<HTMLElement>(null);

    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1
    });

    const {
        data,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        initialPageParam: 0,
        initialData: { pages: [initialPosts], pageParams: [1] },
        queryFn: async ({ pageParam = 1 }) => {
            const query = `/api/post?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}`;

            const { data } = await axios.get(query);
            return data as ExtendedPost[];
        },
        getNextPageParam: (_, pages) => {
            return pages.length + 1;
        },
    });

    const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage();
        }
    }, [entry, fetchNextPage]);


    return (
        <div className="flex flex-col items-center justify-center w-full py-8 gap-y-4 px-4 md:px-0">

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-left w-full font-semibold pb-4"
            >
                Featured Posts
            </motion.h2>

            {posts.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto absolute inset-0">
                    <MotionImage
                        src="/paper-plane.svg"
                        alt="Image of paper plane"
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
                        No Posts Yet
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-4 text-base text-muted-foreground max-w-sm md:max-w-full"
                    >
                        There are no posts available at the moment. Be the first to share your thoughts with the community.
                    </motion.p>
                    <MotionButton variant="subtle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="mt-6"
                    >
                        <Link href="/post/create">
                            Start creating
                        </Link>
                    </MotionButton>
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col items-start gap-y-4"
            >
                {posts?.map((post, index) => {

                    if (index === posts.length - 1) {
                        return (
                            <Link
                                ref={ref}
                                key={post.id}
                                href={`/post/${post.id}`}
                                className="flex flex-col relative items-start w-full border border-border rounded-lg"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <Image
                                        src={post.images?.[0]?.url!}
                                        alt={post.author.name!}
                                        width={2024}
                                        height={2024}
                                        placeholder="blur"
                                        blurDataURL="https://res.cloudinary.com/ddd2iwvzw/image/upload/"
                                        className="object-cover h-40 w-full rounded-t-lg"
                                    />
                                </div>
                                <span className="text-sm text-muted-foreground px-4 pt-4">
                                    {moment(post.createdAt).fromNow()} {" "} • {" "} {post.author.name} {" "} • {" "} 1 min read
                                </span>
                                <h1 className="text-xl font-medium mt-2 px-4">
                                    {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                                </h1>
                                <p className="text-base text-muted-foreground px-4 pt-2">
                                    {post.content.length > 60 ? post.content.slice(0, 60) + "..." : post.content}
                                </p>
                                <Button size="sm" variant="ghost" className="mx-4 mb-2 hover:bg-transparent px-0">
                                    Read More
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        )
                    }

                    return (
                        <Link
                            key={post.id}
                            href={`/post/${post.id}`}
                            className="flex flex-col relative items-start w-full border border-border rounded-lg"
                        >
                            <div className="flex items-center justify-between w-full">
                                <Image
                                    src={post.images?.[0]?.url!}
                                    alt={post.author.name!}
                                    width={2024}
                                    height={2024}
                                    placeholder="blur"
                                    blurDataURL="https://res.cloudinary.com/ddd2iwvzw/image/upload/"
                                    className="object-cover h-40 w-full rounded-t-lg"
                                />
                            </div>
                            <span className="text-sm text-muted-foreground px-4 pt-4">
                                {moment(post.createdAt).fromNow()} {" "} • {" "} {post.author.name} {" "} • {" "} 1 min read
                            </span>
                            <h1 className="text-xl font-medium mt-2 px-4">
                                {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                            </h1>
                            <p className="text-base text-muted-foreground px-4 pt-2">
                                {post.content.length > 60 ? post.content.slice(0, 60) + "..." : post.content}
                            </p>
                            <Button size="sm" variant="ghost" className="mx-4 mb-2 hover:bg-transparent px-0">
                                Read More
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    )
                })}
            </motion.div>

            {isFetchingNextPage ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center w-full py-10"
                >
                    <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
                </motion.div>
            ) : null}

            {!isFetchingNextPage && !hasNextPage ? (
                <div className="flex items-center justify-center w-full py-10">
                    <p className="text-muted-foreground">You have reached the end of the feed.</p>
                </div>
            ) : null}

        </div>
    )
};

export default PostFeed
