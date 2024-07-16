"use server"
import { prisma } from "@/lib/prisma";
import { getSession, login, logout } from "@/auth";
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string
}

export const createCommunity = async(formData:FormData, imageUrl: string) =>{
    const category = formData.get("category") as string;
    const session = await getSession();

    const id = session?.user.id; 

    const createCommunity = await prisma.category.create({
        data: {
          title: category,
          authorId: id,
          imageUrl: imageUrl,
        },
      });
}