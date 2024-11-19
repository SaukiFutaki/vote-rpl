import React from 'react'
import { getVoteSession } from "@/lib/actions/votes";
import moment from "moment";
import { DataTable } from './_components/DataTable'


export default async function Page() {
    const data = await getVoteSession();
    const formattedData = data.map((session: { from: moment.MomentInput; to: moment.MomentInput; }) => ({
        ...session,
        from: moment(session.from).format("MMMM Do YYYY, h:mm:ss a"),
        to: moment(session.to).format("MMMM Do YYYY, h:mm:ss a"),
      }));
  return (
    <div className='px-5'>
      <div>

        <DataTable data={formattedData} />
      </div>
    </div>
  )
}
