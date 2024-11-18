import { auth } from "@/auth";
import { DrawOutlineButton } from "@/components/hoverdev/DrawOutlineButton";
import { Badge } from "@/components/ui/badge";
import { getRecentVotes } from "@/lib/actions/votes";
import Link from "next/link";
import RecentVoteCard from "./_components/recent-card-votes";

export default async function Page() {
  const session = await auth();
  const userId = session?.user.id;
  const dataRecent = await getRecentVotes(userId as string);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold ">Voting Terakhir Anda</h1>
          <Badge variant={"destructive"}>
            hanya yang bersifat publik yang ditampilkan disini
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {dataRecent.map((vote) => (
            <RecentVoteCard
              key={vote.id}
              id={vote.id}
              title={vote.title}
              code={vote.code}
              from={new Date(vote.from)}
              to={new Date(vote.to)}
              candidates={vote.candidates}
            />
          ))}
        </div>
        <div className="text-center">
          <Link href="/dashboard/vote/participant"  className="text-red-300 hover:text-red-600">
            <DrawOutlineButton>
            Ayo mulai votinggg
            </DrawOutlineButton>
          </Link>
        </div>
      </main>
     
    </div>
  );
}
