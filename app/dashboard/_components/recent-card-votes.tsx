"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const NoSSR = dynamic(
  () => import("@/app/dashboard/vote/participant/_components/CountDown"),
  { ssr: false }
);
interface Candidate {
  id: string;
  name: string;
  votes: number;
  vision: string;
  mission: string;
  image: string;
}

interface RecentVoteCardProps {
  id?: string;
  title: string;
  code: string;
  from: Date;
  to: Date;
  viewable?: boolean;
  candidates: Candidate[];
  enabled?: boolean;
}
export default function RecentVoteCard({
  title,
  to,
  code,
  candidates,
  enabled,
}: RecentVoteCardProps) {
  const winner = candidates.reduce((prev, curr) =>
    curr.votes > prev.votes ? curr : prev
  );

  const endDate = new Date(to);

  const now = new Date();
  const isOngoing = now <= to;
  const cardBgColor = isOngoing
    ? "bg-emerald-400 group-hover:bg-emerald-500"
    : "bg-red-300 group-hover:bg-red-400";
  const statusText = isOngoing ? "BERLANGSUNG" : "SELESAI";

  return (
    <div className="relative group">
      <div className="absolute inset-0 translate-x-2 translate-y-2 border border-black transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
      <div className="absolute inset-0 translate-x-1 translate-y-1 border border-black transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
      <div
        className={`relative ${cardBgColor} p-8 border border-black min-h-[300px] flex flex-col transition-all group-hover:bg-emerald-400`}
      >
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            {title.toUpperCase()}
          </h2>

          <Badge className={`rotate-[30deg] text-sm font-medium `}>
            {statusText}
          </Badge>
        </div>
        <div className="mt-4 mb-auto">
          <p className="text-lg mb-2">
            {isOngoing ? "Puncak klasemen :" : "Pemenang :"}
          </p>
          <div className="flex items-center gap-3">
            <Avatar>
              {/* <AvatarImage src={winner.avatar} alt={winner.name} /> */}
              <AvatarFallback>
                {" "}
                {
                  winner.name
                    ?.split(" ") // Memecah string berdasarkan spasi
                    .map((word) => word.charAt(0).toUpperCase()) // Ambil huruf pertama dari setiap kata dan ubah jadi kapital
                    .join("") // Gabungkan kembali menjadi satu string
                }
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{winner.name}</span>
          </div>
        </div>
        <div className="mt-4 mb-4 text-sm">
          <p>
            Total Pemilih : {candidates.reduce((sum, c) => sum + c.votes, 0)}
          </p>

          <div className="flex items-center gap-3">
            <p>Berakhir pada :</p>
            <NoSSR targetDate={endDate} />
          </div>
        </div>

        {enabled && (
          <Link href={`/dashboard/vote/participant/${code}`}>
            <Button className="w-full bg-white text-black border border-black hover:bg-black hover:text-white transition-colors">
              Lihat Voting
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
