import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

type ResponseData = {
  message: string
}
 
export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const resultPosts = await prisma.category.findMany({
      include: {
        author: true, // Include the related user data
        posts: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return Response.json(resultPosts)
}