"use server"
import { prisma } from "@/lib/prisma";
import { getSession, login, logout } from "@/auth";
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string
}

export const editProfile = async(formData:FormData, imageUrl: string) =>{
    const name = formData.get("name") as string;
    const session = await getSession();
    console.log(name)
    console.log(imageUrl);

    const authorId = session?.user.id;

    if (authorId) {
        console.log("test", imageUrl)
    const editProfile = await prisma.user.update({
        where: {
            id: authorId
        },
        data: {   
            name: name,   
            imageUrl: imageUrl

        }
      });
    }
}