import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";

export async function GET(request: Request) {
    const url = new URL(request.url);

    const page = url.searchParams.get('page');

    const limit = url.searchParams.get('limit');

    try {

        const posts = await db.post.findMany({
            take: parseInt(limit!),
            skip: page ? (parseInt(page) - 1) * parseInt(limit!) : 0,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: true,
                images: true
            },
        });

        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Could not fetch posts' }), { status: 500 });
    }
};
