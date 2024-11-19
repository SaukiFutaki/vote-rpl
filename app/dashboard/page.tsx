import { auth } from "@/auth";
import { DrawOutlineButton } from "@/components/hoverdev/DrawOutlineButton";
import { Badge } from "@/components/ui/badge";
import { getRecentVotes, getVoteEnded, getVotesActive } from "@/lib/actions/votes";
import Link from "next/link";
import RecentVoteCard from "./_components/recent-card-votes";
import { Separator } from "@/components/ui/separator";


export default async function Page() {
  const session = await auth();
  const userId = session?.user.id;
  const dataRecent = await getRecentVotes(userId as string);
  const activeVotes = await getVotesActive();
  const deActiveVotes = await getVoteEnded();
  console.log(deActiveVotes)

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-8">
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold ">Voting Terakhir Anda</h1>
            <Badge variant={"destructive"}>
              hanya yang bersifat publik yang ditampilkan disini
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {dataRecent.length > 0 ? (
              dataRecent.map((vote) => (
                <RecentVoteCard
                  key={vote.id}
                  id={vote.id}
                  title={vote.title}
                  code={vote.code}
                  from={new Date(vote.from)}
                  to={new Date(vote.to)}
                  candidates={vote.candidates}
                  enabled
                />
              ))
            ) : (
              <p className=" text-red-700 font-bold underline text-xl animate-pulse">
                Belum ada voting yang pernah kamu ikuti
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold ">
              Voting yang sedang berlangsung
            </h1>
            <Badge variant={"destructive"}>
              hanya yang bersifat publik yang ditampilkan disini
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {activeVotes.length > 0 ? (
              activeVotes.map((vote) => (
                <RecentVoteCard
                  key={vote.id}
                  id={vote.id}
                  title={vote.title}
                  code={vote.code}
                  from={new Date(vote.from)}
                  to={new Date(vote.to)}
                  candidates={vote.candidates}
                  enabled
                />
              ))
            ) : (
              <p className=" text-red-700 font-bold underline text-xl animate-pulse">
                Belum ada voting yang sedang berlangsung
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold ">
                Voting yang sudah berakhir
            </h1>
            <Badge variant={"destructive"}>
              hanya yang bersifat publik yang ditampilkan disini
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {deActiveVotes.length > 0 ? (
              deActiveVotes.map((vote) => (
                <RecentVoteCard
                  key={vote.id}
                  id={vote.id}
                  title={vote.title}
                  code={vote.code}
                  from={new Date(vote.from)}
                  to={new Date(vote.to)}
                  candidates={vote.candidates}
                />
              ))
            ) : (
              <p className=" text-red-700 font-bold underline text-xl animate-pulse">
                Belum ada voting yang sudah berakhir
              </p>
            )}
          </div>
        </div>
        <Separator  className="bg-black"/>
        <div className="text-center mt-2">
          <Link
            href="/dashboard/vote/participant"
            className="text-red-300 hover:text-red-600"
          >
            <DrawOutlineButton>Ayo mulai votinggg</DrawOutlineButton>
          </Link>
        </div>
      </main>
    </div>
  );
}
