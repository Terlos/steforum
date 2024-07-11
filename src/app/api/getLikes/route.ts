import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession();
  const userId = session?.user.id;

  if(session){

  const likedPosts = await prisma.liked.findMany({
    where: {
      authorId: userId,
    },
    select: {
      postId: true,
    },
  });
  
  const postIds = likedPosts.map(post => post.postId);
  
  const getLikedPosts = await prisma.post.findMany({
    where: {
      id: {
        in: postIds,
      },
    }
  });
  
  console.log(getLikedPosts);
  
  return Response.json(getLikedPosts)
}else{
  return
}
}
