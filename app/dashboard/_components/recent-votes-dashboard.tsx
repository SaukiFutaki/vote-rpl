'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'

type VotingSession = {
  id: string
  title: string
  endDate: string
  winner: {
    name: string
    avatar: string
  }
  totalVotes: number
}

const recentVotes: VotingSession[] = [
  {
    id: '1',
    title: 'Pemilihan Ketua OSIS 2024',
    endDate: '2024-05-15',
    winner: {
      name: 'Budi Santoso',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    totalVotes: 1250
  },
  {
    id: '2',
    title: 'Pemilihan Ketua RT 005',
    endDate: '2024-04-30',
    winner: {
      name: 'Ibu Siti',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    totalVotes: 150
  },
  {
    id: '3',
    title: 'Pemilihan Logo Baru Perusahaan',
    endDate: '2024-05-01',
    winner: {
      name: 'Desain A',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    totalVotes: 500
  },
]

export default function RecentVotesDashboard() {
  const [votes] = useState<VotingSession[]>(recentVotes)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Voting Terakhir Anda</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {votes.map((vote) => (
          <Card key={vote.id}>
            <CardHeader>
              <CardTitle>{vote.title}</CardTitle>
              <CardDescription>Berakhir pada {new Date(vote.endDate).toLocaleDateString('id-ID')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={vote.winner.avatar} alt={vote.winner.name} />
                  <AvatarFallback>{vote.winner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Pemenang:</p>
                  <p>{vote.winner.name}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Badge variant="secondary">Voting Selesai</Badge>
                <p className="text-sm text-muted-foreground">{vote.totalVotes} suara</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button variant="outline">
          Lihat Semua Voting <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}