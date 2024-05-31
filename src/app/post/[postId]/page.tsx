import PostContent from "@/components/post-content";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from 'react'

interface Props {
    params: {
        postId: string;
    }
}

const PostPage = async ({ params }: Props) => {

    const { postId } = params;

    const post = await db.post.findUnique({
        where: {
            id: postId,
        },
        include: {
            author: true,
            images: true,
        },
    });

    if (!post) {
        return notFound();
    }

    return (
        <PostContent post={post} />
    )
};

export default PostPage
