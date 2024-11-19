import React from 'react'
import HeroSectionCreate from './_components/HeroSectionCreate'
import CreateVote from './_components/CreateVote'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth()
  const user = session?.user
  if(user?.role !== 'ADMIN') {
    redirect('/dashboard/vote/participant')
  }
  return (
    <div className='container mx-auto px-4'>
        <HeroSectionCreate />
        <CreateVote />
    </div>
  )
}
