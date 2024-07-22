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
    const argon2 = require('argon2');

    
    if(password === rePassword){
        const emailExists = await prisma.user.findUnique({
            where: {
              email: email
            }
          });
        if(!emailExists){
          try {
            const hash = await argon2.hash(password);
            const user = await prisma.user.create({
              data: {
                name: name,
                email: email,
                password: hash,
                banned: false,
                imageUrl: "https://utfs.io/f/44e35f99-64e3-44b7-8bb5-c2568ce1fcfd-u4wary.jpg"
              },
            });
          } catch (err) {
            console.log(err)
          }
    }else{
        console.error("User with this email already exists")
    }
    }else{
        console.error("Password doesn't match")
    }
}