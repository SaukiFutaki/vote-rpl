"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { register } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";
import { RegisterSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      nim: "",
      password: "",
      confirmPassword: "",
    },
  });
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    startTransition(() => {
      register(values);
    });
  }
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Create an account
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please fill in the form to create an account
      </p>

      <Form {...form}>
        <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 ">
            <FormField
              control={form.control}
              name="nim"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LabelInputContainer className="mb-4">
                      <Label>NIM</Label>
                      <Input
                        placeholder="2208096090"
                        {...field}
                        disabled={isPending}
                      />
                    </LabelInputContainer>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LabelInputContainer className="mb-8">
                      <Label>Name</Label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        {...field}
                        disabled={isPending}
                      />
                    </LabelInputContainer>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LabelInputContainer className="mb-4">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="johnDoe@student.walisongo.ac.id"
                      {...field}
                      disabled={isPending}
                    />
                  </LabelInputContainer>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LabelInputContainer className="mb-4">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={isPending}
                    />
                  </LabelInputContainer>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LabelInputContainer className="mb-4">
                    <Label>Confirm password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={isPending}
                    />
                  </LabelInputContainer>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {isPending ? (
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
              type="submit"
            >
              <Loader2 className="animate-spin h-5 w-5 text-center " />

              <BottomGradient />
            </button>
          ) : (
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign Up &rarr;
              <BottomGradient />
            </button>
          )}

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </Form>

      <div className="flex flex-col space-y-4 mb-4">
        <button
        disabled
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Google
          </span>
          <BottomGradient />
        </button>
      </div>
      <Link
        href={"/auth/register"}
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        <span>create an account</span>
      </Link>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
