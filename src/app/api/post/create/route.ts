import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from 'zod';
import { PostValidator } from "@/lib/post";
import { AxiosError } from "axios";
import { getAuthSession } from "@/lib/auth";

export async function POST(request: Request) {
    const body = await request.json();

    const { title, content, images } = PostValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorize", { status: 401 });
    }

    if (!title || !content || !images) {
        return new NextResponse("Invalid data provided", { status: 422 });
    }

    try {
        await db.post.create({
            data: {
                title,
                content,
                authorId: session.user.id,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image),
                        ],
                    },
                },
            }
        });

        return NextResponse.json("Post created", { status: 201 });
    } catch (error) {
        if (error instanceof AxiosError) {
            return new NextResponse("Invalid request data passed", { status: 422 });
        }

        return new NextResponse("Could not create post", { status: 500 });
    }
};
