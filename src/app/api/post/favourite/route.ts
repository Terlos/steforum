import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId } = body;

    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Save the favorite post
    await prisma.liked.create({
      data: {
        authorId: userId,
        postId: postId,
      },
    });

    const posts = await prisma.post.findMany({
      where: {
        id: postId,
      },
      include: {
        author: true,
        comments: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const shadowArray = await Promise.all(
      posts.map(async (post) => {
        const existPost = await prisma.liked.findFirst({
          where: {
            authorId: userId,
            postId: post.id,
          },
        });

        return {
          ...post,
          isLiked: !!existPost,
        };
      })
    );

    return NextResponse.json({ message: 'Success', posts: shadowArray });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
