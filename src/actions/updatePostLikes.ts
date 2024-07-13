"use server"
import { prisma } from "@/lib/prisma";
import { getSession } from "@/auth";
import type { NextApiRequest, NextApiResponse } from 'next';

export const updatePostLikes = async(postId: string) => {
    
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

      
      const getPost = await prisma.post.findFirst({
        where: {
            id: postId,
        },
        select: {
            like: true,
        },
    });



    if(!existPost){
        const liked = await prisma.liked.create({
            data: {
              authorId: userId,
              postId: postId,
            },
          });
        
        if (getPost) {
            const newLikeCount = getPost.like + 1;
        
            const updatePost = await prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    like: newLikeCount,
                    authorId: userId,
                },
            });
            
        return updatePost;
        }
}else{
    const deleteLiked = await prisma.liked.deleteMany({
        where: {
          authorId: userId,
          postId: postId,
        },
      });
    
    if (getPost) {
        const newLikeCount = getPost.like - 1;
    
        const updatePost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                like: newLikeCount,
                authorId: userId,
            },
        });

    return updatePost;
    }
}
};
