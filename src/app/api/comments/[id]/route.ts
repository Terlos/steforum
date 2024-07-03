import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export async function POST(
  request: NextApiRequest,
  { params }: { params: {id: string } }
) {
  const slug = params.id

  const resultPosts = await prisma.post.findMany({
    where: {
      id: slug // Assuming slug corresponds to category ID
    },
        include: {
          author: true,
          category: true,
          comments: {
            include: {
              author: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
  });
  return Response.json(resultPosts);
}

