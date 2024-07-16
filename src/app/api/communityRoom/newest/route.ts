import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type ResponseData = {
  message: string
}
 
export async function POST(
  req: NextRequest,
  res: NextResponse<ResponseData>
) {
    const resultPosts = await prisma.category.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            author: true, // Include the related user data
            posts: true,
          },
      })
    return NextResponse.json(resultPosts)
}