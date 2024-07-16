import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getSession } from '@/auth';

type ResponseData = {
  message: string
}

export async function POST(
  req: NextRequest,
  res: NextResponse<ResponseData>
) {

  const session = await getSession();
  const userId = session?.user.id;
    
  const resultPosts = await prisma.post.findMany({
    include: {
      author: true, // Include the related user data
      comments: true,
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  
  const shadowArray = await Promise.all(resultPosts.map(async post => {

    const existPost = await prisma.liked.findFirst({
      where: {
        authorId: userId,
        postId: post.id,
      },
    });
  
    return {
      ...post,
      isLiked: !!existPost && userId,
    };
  }));
  
  return NextResponse.json(shadowArray)
}