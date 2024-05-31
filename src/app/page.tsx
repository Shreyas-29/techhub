import EmptyFeed from "@/components/empty-feed";
import PostFeed from "@/components/post-feed";
import { Button } from "@/components/ui/button";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

const HomePage = async () => {

    const session = await getAuthSession();

    // here add a logic to fetch first 5 only posts then when button click will fetch next 5 posts
    const posts = await db.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            author: true,
            images: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
    });

    return (
        <div className="max-w-xl mx-auto min-h-[calc(100vh-120px)]">
            {session?.user ? (
                <PostFeed initialPosts={posts} />
            ) : (
                <EmptyFeed />
            )}
        </div>
    )
};

export default HomePage
