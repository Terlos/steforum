"use server"
import { prisma } from "@/lib/prisma";
import { getSession } from "@/auth";
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string
}

export const createComment = async (formData: FormData, parentId: string, categoryId: string, imageUrl:string) => {
  const text = formData.get("text") as string;
  const session = await getSession();

  const authorId = session?.user.id;
  if (!authorId) {
    throw new Error("User is not authenticated.");
  }

  if (!categoryId) {
    throw new Error("CategoryId is required.");
  }
  
  if(authorId){
  const createComment = await prisma.post.create({
    data: {
      title: "",
      text: text,
      authorId: authorId,
      parentId: parentId,
      categoryId: categoryId,
      imageUrl: imageUrl,
    },
  });
}
  return createComment;
};