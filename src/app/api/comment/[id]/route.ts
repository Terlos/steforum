
import { NextRequest } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getSession } from '@/auth';

export async function POST(
  request: NextRequest ,
  { params }: { params: { id: string } }
) {
  const slug = params.id;
  const session = await getSession();
  const userId = session?.user.id;

  const resultPosts = await prisma.post.findMany({
    where: {
      id: slug,
    },
    select: {
      comments: {
        select: {
          id: true, // Include the comment ID
          text: true, // Include the comment text
          createdAt: true, // Include the creation date of the comment
          like: true, // Include the like count of the comment
          imageUrl: true,
          author: {
            select: {
              name: true, // Include the author's name
              email: true,
              imageUrl: true
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
  

  const shadowArray = await Promise.all(
    resultPosts[0].comments.map(async (comment) => {
      const existPost = await prisma.liked.findFirst({
        where: {
          authorId: userId,
          postId: comment.id, // Assuming comment.id is the correct field
        },
      });
          return {
            ...comment,
            isLiked: !!existPost, // Convert the existence check to a boolean
          };
      })
  );
  
  return Response.json(shadowArray);
}