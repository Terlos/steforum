"use server"
import { prisma } from "@/lib/prisma";
import { getSession, login, logout } from "@/auth";
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string
}

export const createPost = async(formData:FormData, categoryId: string, imageUrl: string) =>{
    const title = formData.get("title") as string;
    const text = formData.get("text") as string;
    const session = await getSession();
    const authorId = session?.user.id;

    const createCategory = await prisma.post.create({
        data: {
          title: title,
          text: text,
          authorId: authorId,
          categoryId: categoryId,
          like: 0,
          imageUrl: imageUrl,
        },
      });
}