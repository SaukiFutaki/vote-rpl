import { getVoteBySessionId } from '@/lib/actions/votes';
import React from 'react'
import UpdateVotingSession from './updateFormVoteSession';

interface Iprops {
  params : Promise<
    {
      id : string;
    }
  >
}

export default async function Page({ params } : Iprops) {
  const { id } = await params;
  const data = await getVoteBySessionId(id);

  return (
    <div>
   
      {data.map((session) => (
        <UpdateVotingSession 
          key={session.id}
          session={session}
        />
      ))}
    </div>
  )
}
