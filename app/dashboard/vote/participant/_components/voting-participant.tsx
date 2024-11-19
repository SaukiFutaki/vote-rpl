/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useToast } from "@/hooks/use-toast";
import { submitVote } from "@/lib/actions/votes";
import { VotingInterfaceProps } from "@/types";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";
import Countdown from "./CountDown";
import { pusherClient } from "@/lib/pusher";
import { useEffect } from "react";

export default function VotingParticipant({ session }: VotingInterfaceProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const channel = pusherClient.subscribe(`vote-channel-${session.id}`);
    channel.bind("vote-updated", () => {
  
      router.refresh();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [session.id, router]);

  const colorPalette = ["#FFC107", "#2196F3", "#4CAF50", "#FF5722", "#9333ea"]; // Warna kandidat
  const chartConfig: Record<string, { label: string; color: string }> =
    session.candidates?.reduce((config, candidate, index) => {
      config[candidate.id] = {
        label: candidate.name,
        color: colorPalette[index % colorPalette.length],
      };
      return config;
    }, {} as Record<string, { label: string; color: string }>) || {};

  // Kandidat dengan data tambahan
  const candidates = session.candidates?.map((candidate) => ({
    ...candidate,
    fill: chartConfig[candidate.id].color,
  }));

  const totalVotes = useMemo(
    () =>
      candidates
        ? candidates.reduce((acc, curr) => acc + (curr?.votes || 0), 0)
        : 0,
    [candidates]
  );

  // Tambahkan persentase suara ke kandidat
  const candidatesWithPercentage = candidates?.map((candidate) => ({
    ...candidate,
    percentage: totalVotes
      ? (((candidate?.votes || 0) / totalVotes) * 100).toFixed(2)
      : "0",
  }));

  const startDate = new Date(session.from);
  const endDate = new Date(session.to);
  console.log("H", endDate);

  const handleVoteSubmission = async () => {
    if (!selectedCandidate) {
      toast({
        title: "Error",
        description: "Please select a candidate first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await submitVote(
        session.id as string,
        selectedCandidate
      );
      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
        });
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while submitting your vote",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">{session.title}</h1>
      <p className="text-center mb-4">Voting Sedang Berlangsung :</p>
      <Countdown targetDate={endDate} />

      <div className="mb-8">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={candidates}
                dataKey="votes"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                {candidates?.map((candidate, index) => (
                  <Cell key={index} fill={candidate.fill} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVotes.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Votes
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {endDate < startDate && (
        <div className="bg-red-100 text-red-900 p-4 rounded-lg mb-4">
          <p className="font-semibold">Voting telah berakhir</p>
          <p className="text-sm">
            Voting ini telah berakhir pada {endDate.toLocaleString()}
          </p>
        </div>
      )}

      {candidatesWithPercentage?.map((candidate, index) => (
        <Card
          key={candidate.id}
          className={`mb-4 ${
            selectedCandidate === candidate.id ? "ring-2 ring-primary" : ""
          }`}
        >
          <CardContent className="p-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <div>
                <span
                  style={{ color: candidate.fill }}
                  className="font-bold mr-2"
                >
                  {index + 1}
                </span>
                <span style={{ color: candidate.fill }}>{candidate.name}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">{candidate.percentage}%</span>
                {selectedCandidate === candidate.id && (
                  <div className="bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="details">
                <AccordionTrigger>Lihat Detail</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Visi:</h3>
                      <p>{candidate.vision}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Misi:</h3>
                      <p className="whitespace-pre-line">{candidate.mission}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {startDate > endDate ? (
           
            <Button className="w-full" disabled>
              Voting telah berakhir
            </Button>
          ) : (
            <Button
            className="w-full"
            disabled={!selectedCandidate || isSubmitting}
          >
            {isSubmitting ? "Memproses..." : "Kirim Vote Saya"}
          </Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Vote</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin dengan pilihan Anda? Vote tidak dapat diubah
              setelah dikirim.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleVoteSubmission}>
              Ya, Kirim Vote
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
