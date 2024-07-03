import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../library/prisma';

type ResponseData = {
  message: string
}
 
export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const resultPosts = await prisma.user.findMany()
    return Response.json({users: resultPosts})
}
