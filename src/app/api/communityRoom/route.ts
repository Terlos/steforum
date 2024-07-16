import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

type ResponseData = {
  message: string
}
 
export async function POST(
  req: NextRequest,
  res: NextResponse<ResponseData>
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
    return NextResponse.json(resultPosts)
}