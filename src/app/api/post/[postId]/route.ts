import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, params: { postId: string }) {
    // const { postId } = params;

    const url = new URL(request.url);

    console.log("params", params, url);

    // url.pathname = pathname: '/api/post/6659c452bf8b3cbe53ae2ed5', now extract the postId from the pathname
    const postId = url.pathname.split("/").pop();
    console.log("postid", postId);

    try {
        const session = await getAuthSession();

        if (!postId) {
            return new Response("Invalid post id", { status: 400 });
        }

        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        console.log("user is authenticated");

        const postToDelete = await db.post.findFirst({
            where: {
                id: postId,
                authorId: session?.user.id,
            },
        });

        console.log("post to delete");

        if (!postToDelete) {
            return new Response("Unauthorized", { status: 422 });
        }

        console.log("post found");

        const post = await db.post.delete({
            where: {
                id: postId,
            },
        });

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.log("Error deleting post", error);
        return new Response("Could not delete the post", { status: 500 });
    }
};
