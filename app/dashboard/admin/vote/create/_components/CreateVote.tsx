/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Plus, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormVoteValues, formVoteSchema } from "@/schemas/voteSchema";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { postVoteSession } from "@/lib/actions/votes";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

// import { toast } from "@/components/ui/use-toast"

export default function CreateVote() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<FormVoteValues>({
    resolver: zodResolver(formVoteSchema),
    defaultValues: {
      title: "",
      dateRange: {
        from: undefined,
        to: undefined,
      },
      isPublished: false,
      isViewabled: false,
      candidates: [{ name: "", vision: "", mission: "", photo: undefined }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "candidates",
  });

  function onSubmit(data: FormVoteValues) {
    startTransition(() => {
      postVoteSession(data).then(() => {
        toast({
          title: "Voting berhasil dibuat",
          description: "Data voting telah disimpan",
        });
        router.push("/dashboard/admin/vote/list");
      });
    });
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="space-y-6 pt-10">
        <div className="flex items-start gap-6">
          <Image
            src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHZvdGV8ZW58MHx8MHx8fDA%3D"
            alt="Person at desk illustration"
            width={350}
            height={200}
            className="dark:invert"
          />
          <div>
            <h1 className="text-2xl font-bold">Buat Voting Baru</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Silahkan masukkan data yang dibutuhkan sebelum membuat vote online
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Detail Voting</h2>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: Voting Calon Gubernur"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Periode Voting</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value?.from ? (
                                field.value.to ? (
                                  <>
                                    {format(field.value.from, "dd/MM/yyyy")} -{" "}
                                    {format(field.value.to, "dd/MM/yyyy")}
                                  </>
                                ) : (
                                  format(field.value.from, "dd/MM/yyyy")
                                )
                              ) : (
                                <span>Pilih periode voting</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={field.value?.from}
                            selected={field.value}
                            onSelect={field.onChange}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Publikasikan
                        </FormLabel>
                        <FormDescription>
                          Voting akan langsung dipublikasikan setelah dibuat
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isViewabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Tampilkan Hasil Voting
                        </FormLabel>
                        <FormDescription>
                          Hasil voting akan langsung ditampilkan setelah voting
                          berakhir
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Kandidat</h2>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <Card key={field.id}>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                            {index + 1}
                          </div>
                          <FormField
                            control={form.control}
                            name={`candidates.${index}.name`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    placeholder="Nama Kandidat"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <FormField
                        control={form.control}
                        name={`candidates.${index}.vision`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Visi</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Masukkan visi kandidat"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`candidates.${index}.mission`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Misi</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Masukkan misi kandidat"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`candidates.${index}.photo`}
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Foto Kandidat</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  onChange(file);
                                }}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() =>
                    append({
                      name: "",
                      vision: "",
                      mission: "",
                      photo: undefined,
                    })
                  }
                >
                  <Plus className="w-4 h-4" />
                  Tambah Kandidat
                </Button>
              </div>
            </div>

            {isPending ? (
              <Button type="submit" className="w-full" disabled>
                <Loader2 className="animate-spin h-5 w-5 text-center" />
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Buat Voting
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
