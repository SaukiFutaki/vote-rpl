import React from "react";

import { getVoteSessionByCode } from "@/lib/actions/votes";
import { notFound } from "next/navigation";
import VotingParticipant from "../_components/voting-participant";
import { VoteSession } from "@/types";

interface IProps {
  params: Promise<{
    code?: string;
  }>;
}

// TODO : revalidate setiap 30 detik
export const revalidate = 30;

export default async function Page({ params }: IProps) {
  const { code } = await params;
  const data = await getVoteSessionByCode(code as string) as VoteSession;
  if (!data) {
    return notFound();
  }
  console.log(data);

  return (
    <div>
      <VotingParticipant session={data} />
    </div>
  );
}
