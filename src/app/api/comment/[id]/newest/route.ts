import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const slug = params.id

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
          createdAt: 'desc',
        },
      },
    },
  });
  const comment = resultPosts[0].comments
  return Response.json(comment);
}

