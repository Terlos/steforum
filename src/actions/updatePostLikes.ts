"use server"
import { prisma } from "@/lib/prisma";
import { getSession } from "@/auth";
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string
}

export const updatePostLikes = async(postId: string, likes: number) => {
    
    const session = await getSession();
    const userId = session?.user.id;

    

    if (!userId) {
        throw new Error("User is not authenticated");
    }

    const existPost = await prisma.liked.findFirst({
        where: {
          authorId: userId,
          postId: postId,
        },
      });      
    if(!existPost){
        const liked = await prisma.liked.create({
            data: {
              authorId: userId,
              postId: postId,
            },
          });

    const updatePost = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            like: likes + 1,
            authorId: userId,
        },
    });

    return updatePost;
}else{
    console.log("You already liked this post");
}
};
