import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string
}
 
export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const resultPosts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            author: true, // Include the related user data
            comments: true,
            category: true,
          },
      })
    return Response.json(resultPosts)
}