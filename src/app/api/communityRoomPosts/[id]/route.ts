import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const slug = params.id
  console.log(slug)
    const session = await getSession();
  const userId = session?.user.id;
  
  const resultCategory = await prisma.category.findUnique({
    where: {
      id: slug as string,
    },
    include: {
      posts: {
        include: {
          author: true,
          comments: true,
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if(resultCategory){
    const shadowArray = await Promise.all(resultCategory.posts.map(async post => {
  
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
    
    return Response.json(shadowArray)
    }

}

