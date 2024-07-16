import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function POST(
  request: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const slug = params.id
  console.log("haha")
  console.log("gg", slug)
  
  const resultPosts = await prisma.post.findMany({
    where: {
      id: slug,
    },
    include: {
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
          createdAt: 'asc',
        },
      },
    },
  });
  const comment = resultPosts[0].comments
  return Response.json(comment);
}

