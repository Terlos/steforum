import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function POST(
  request: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const slug = params.id

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
  const posts = resultCategory?.posts
  return Response.json(posts);
}

