import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
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
          createdAt: 'asc',
        },
      },
    },
  });

  const posts = resultCategory?.posts
  return NextResponse.json(posts);
}

