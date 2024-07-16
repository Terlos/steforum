"use server"
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string
}

export const registerForm = async(formData:FormData) =>{
    const name = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const rePassword = formData.get("rePassword") as string;
    if(password === rePassword){
        const emailExists = await prisma.user.findUnique({
            where: {
              email: email
            }
          });
        if(!emailExists){
        const user = await prisma.user.create({
          data: {
            name: name,
            email: email,
            password: password,
            banned: false,
            imageUrl: ""
          },
        });
    }else{
        console.error("User with this email already exists")
    }
    }else{
        console.error("Password doesn't match")
    }
}