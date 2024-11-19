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

export const dynamic = 'force-dynamic';

export default async function Page({ params }: IProps) {
  const { code } = await params;
  const data = await getVoteSessionByCode(code as string) as VoteSession;

  if (data.id === undefined) {
    return notFound();
  }
  

  return (
    <div>
      <VotingParticipant session={data} />
    </div>
  );
}
