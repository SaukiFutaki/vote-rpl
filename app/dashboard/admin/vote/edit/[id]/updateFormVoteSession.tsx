"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { editVoteSessionById } from "@/lib/actions/votes";
import { cn } from "@/lib/utils";
import { FormVoteEditValues, formVoteSchema } from "@/schemas/voteSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Plus, Trash2 } from "lucide-react";

import { ToastAction } from "@/components/ui/toast";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface Candidate {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  vision: string;
  mission: string;
  sessionId: string;
}

interface VoteSession {
  id?: string;
  title: string;
  code: string;
  from: Date;
  to: Date;
  createdAt: Date;
  updatedAt: Date;
  candidates?: Candidate[];
}

interface VoteSessionProps {
  session: VoteSession;
}

export default function UpdateVotingSession({ session }: VoteSessionProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormVoteEditValues>({
    resolver: zodResolver(formVoteSchema),
    defaultValues: {
      title: session.title,
      code: session.code,
      dateRange: { from: session.from, to: session.to },
      candidates: session.candidates?.map((candidate) => ({
        name: candidate.name,
        vision: candidate.vision,
        mission: candidate.mission,
      })) ?? [{ name: "", vision: "", mission: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "candidates",
  });

  async function onSubmit(data: FormVoteEditValues) {
    startTransition(() => {
      if (session.id) {
        editVoteSessionById(session.id, data);
        toast({
          title: "Voting session updated",
          description: "Voting session has been updated successfully",
        });
      } else {
        toast({
          title: "Failed to update voting session",
          description: "Session ID is missing",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    });
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Update Voting Session</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul Voting</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                          <>
                            {format(field.value.from, "PPP")} -{" "}
                            {format(field.value.to, "PPP")}
                          </>
                        ) : (
                          <span>Pick a date range</span>
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
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Voting</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={6} disabled />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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
                                <Input placeholder="Nama Kandidat" {...field} />
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
                          <Trash2 className="h-4 w-4" />
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
  );
}
