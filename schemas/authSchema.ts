import  * as  z from 'zod';

export const LoginSchema = z.object({
    nim : z.string().min(10),
    password: z.string().min(6),
})

export const RegisterSchema = z.object({
    nim : z.string().min(10),
    email: z.string().email().refine((val) => val.endsWith('@student.walisongo.ac.id'), {
        message: "Email must end with '@student.walisongo.ac.id'",
        path: ['email'], 
      }),
    password: z.string().min(6),
    name : z.string(),
    confirmPassword : z.string().min(6),
}).refine(data => data.password === data.confirmPassword, {
    message : "Password and Confirm Password must be the same",
    path : ["confirmPassword"]
})