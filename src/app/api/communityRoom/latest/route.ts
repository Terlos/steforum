import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string
}
 
export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const resultPosts = await prisma.category.findMany({
        orderBy: {
            createdAt: 'asc',
        },
        include: {
            author: true, // Include the related user data
            posts: true,
          },
      })
    return Response.json(resultPosts)
}