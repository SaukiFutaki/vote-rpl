"use server";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";

import { signIn } from "@/auth";

import { z } from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas/authSchema";
import bcrypt from "bcryptjs";
import prisma from "../db/prisma";
import { getUserByNim } from "../db/user";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";


export async function login(values: z.infer<typeof LoginSchema>) {
    const validatedFields = LoginSchema.safeParse(values);
  
    if (!validatedFields.success) {
      return { error: "Invalid" + validatedFields.error.errors[0].message };
    }
    const { nim, password } = validatedFields.data;
  
    try {
      await signIn("credentials", {
        nim,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid Credentials" };
          default:
            return { error: "An error occured" };
        }
      }
      throw error;
    }
  
    return { success: "Login Success" };
  }
  
  export async function register(values: z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(values);
  
    if (!validatedFields.success) {
      return { error: "Invalid" + validatedFields.error.errors[0].message };
    }
  
    const { nim, email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const existingUser = await getUserByNim(nim);
  
    if (existingUser) {
      console.log("User already exists");
      return { error: "User already exists" };
    }
  
    await prisma.user.create({
      data: {
        nim,
        email,
        password: hashedPassword,
        name,
      },
    });
    redirect("/auth/login");
  }
  