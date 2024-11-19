"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  code: z.string().min(1, "Kode voting harus diisi"),
});

export default function FormCodeParticipant() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      router.push(`/dashboard/vote/participant/${values.code}`);
    });
  }

  return (
    <div className="container max-w-md mx-auto px-4 pt-20 h-screen">
      <div className="text-center space-y-6">
        <Image
          src="https://images.unsplash.com/photo-1598802777393-751e5387ecd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHZvdGV8ZW58MHx8MHx8fDA%3D"
          width={500}
          height={200}
          alt="Illustration of people high-fiving"
          className="mx-auto"
        />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Ikutan Voting</h1>
          <p className="text-sm text-muted-foreground">
            Untuk ikutan voting, kamu harus memasukkan kode voting yang sudah di
            berikan panitia/penyelenggara
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Kode Voting"
                      {...field}
                      className="text-center border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isPending ? (
              <Button type="submit" className="w-full" disabled>
                <Loader2 className="animate-spin h-5 w-5 text-center" />
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Lanjutkan
              </Button>
            )}
          </form>
        </Form>

        <h1
          onClick={() => router.push("/dashboard")}
          className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Kembali
        </h1>
      </div>
    </div>
  );
}
