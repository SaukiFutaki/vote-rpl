"use server";

import prisma from "@/lib/db/prisma";
import { FormVoteValues } from "@/schemas/voteSchema";
import { code } from "../code";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { pusherServer } from "../pusher";




export async function postVoteSession(values: FormVoteValues) {
  const session = await auth();
  const user = session?.user.name
  

  const { title, dateRange, candidates, isPublished, isViewabled } = values;
  console.log(title, dateRange, candidates);

  const result = await prisma.votingSession.create({
    data: {
    publisher : user ?? "Anonymous",
      title: title,
      from: dateRange.from,
      to: dateRange.to,
      code : code(6),
      isPublished : isPublished,
      isViewabled : isViewabled,
      candidates: {
        create: candidates.map((candidate) => ({
          name: candidate.name,
          image: typeof candidate.photo === 'string' ? candidate.photo : "",
          vision: candidate.vision,
          mission: candidate.mission,
        })),
      },
    },
    include: {
      candidates: true,
    },
  });

    return result;
}


export async function getVoteSession() {
    const result = await prisma.votingSession.findMany({
        include: {
            candidates: true,
        },
    });
    
    return result;
}



export async function clickVote(sessionId: string, candidateId: string) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("User is not authenticated.");
  }

  // Cek jika user sudah pernah voting dalam sesi ini
  const existingVote = await prisma.vote.findFirst({
    where: {
      voterId: userId,
      candidate: {
        sessionId: sessionId,
      },
    },
  });

  if (existingVote) {
    throw new Error("User has already voted in this session.");
  }

  // Buat vote baru jika user belum voting
  const result = await prisma.vote.create({
    data: {
      voterId: userId,
      candidateId: candidateId,
      sessionId: sessionId,
    },
  });

  return result;
}


// TODO : Implementasi fungsi votesCountBySessionId untuk mendapatkan jumlah vote berdasarkan sessionId
export async function votesCountBySessionId(sessionId: string) {
    const result = await prisma.vote.count({
        where: {
            id: sessionId,
        },
    });

    return result;
}

// TODO : Implementasi fungsi votesCountByCandidateId untuk mendapatkan jumlah vote berdasarkan candidateId
export async function votesCountByCandidateId(candidateId: string) {
    const result = await prisma.vote.count({
        where: {
            candidateId: candidateId,
        },
    });

    return result;
}

// TODO : Implementasi fungsi getVoteBySessionId untuk mendapatkan data voting berdasarkan sessionId
export async function getVoteBySessionId(sessionId: string) {
    const result = await prisma.votingSession.findMany({
        where: {
            id: sessionId,
        },
        include: {
            candidates: true,
        },
    });

    return result;
}



// TODO : Implementasi fungsi deleteVoteSessionById, editVoteSessionById
export async function deleteVoteSessionById(sessionId: string) {
    const result = await prisma.votingSession.delete({
        where: {
            id: sessionId,
        },
    });
    revalidatePath('/dashboard/admin/vote/list')
    return result;
}

// TODO : Implementasi fungsi editVoteSessionById
export async function editVoteSessionById(sessionId: string, values: FormVoteValues) {
    const { title, dateRange, candidates, isPublished,isViewabled } = values;

    const result = await prisma.votingSession.update({
        where: {
            id: sessionId,
        },
        data: {
            title: title,
            from: dateRange.from,
            to: dateRange.to,
            isPublished: isPublished,
            isViewabled: isViewabled,
            candidates: {
                deleteMany: {},
                create: candidates.map((candidate) => ({
                    image: typeof candidate.photo === 'string' ? candidate.photo : "",
                    name: candidate.name,
                    vision: candidate.vision,
                    mission: candidate.mission,
                })),
            },
        },
    });

    return result;
}

export async function votesCountBySession(sessionId: string) {
  const result = await prisma.candidate.findMany({
      where: {
          sessionId: sessionId,
      },
      include: {
        
          _count: {
              select: { votes: true },
          },
      },
  });

  return result.map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      votes: candidate._count.votes,
      mission : candidate.mission,
      vision : candidate.vision,
     
  }));
}


// TODO : Implementasi fungsi getVoteSessionByCode
export async function getVoteSessionByCode (code: string) {
  const session = await prisma.votingSession.findUnique({
      where: {
        code : code
      },
      include: {
          candidates: {
            include : {
              votes: true
            }
          }
          
      },
  })

  return {
    id: session?.id,
    title: session?.title,
    code: session?.code,
    from: session?.from,
    to: session?.to,
    candidates: session?.candidates.map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      votes: candidate.votes.length,
      vision: candidate.vision,
      mission: candidate.mission,
      image: candidate.image,
    })),
  };
}




interface VoteResponse {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}



// TODO : Implementasi fungsi submitVote
export async function submitVote(
  sessionId: string,
  candidateId: string
): Promise<VoteResponse> {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return {
        success: false,
        message: "Anda harus login terlebih dahulu untuk melakukan voting.",
      };
    }

    // Check if voting session exists and is active
    const votingSession = await prisma.votingSession.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!votingSession) {
      return {
        success: false,
        message: "Sesi voting tidak ditemukan.",
      };
    }

    // Check if voting period is active
    const currentTime = new Date();
    if (currentTime < votingSession.from || currentTime > votingSession.to) {
      return {
        success: false,
        message: "Sesi voting belum dimulai atau sudah berakhir.",
      };
    }

    // Check if user has already voted in this session
    const existingVote = await prisma.vote.findFirst({
      where: {
        voterId: userId,
        sessionId: sessionId,
      },
    });

    if (existingVote) {
      return {
        success: false,
        message: "Anda sudah melakukan voting dalam sesi ini.",
      };
    }

    // Check if candidate exists in this session
    const candidate = await prisma.candidate.findFirst({
      where: {
        id: candidateId,
        sessionId: sessionId,
      },
    });

    if (!candidate) {
      return {
        success: false,
        message: "Kandidat tidak ditemukan dalam sesi ini.",
      };
    }

    // Create vote using transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      const vote = await tx.vote.create({
        data: {
          voterId: userId,
          candidateId: candidateId,
          sessionId: sessionId,
        },
        include: {
          candidate: {
            select: {
              name: true,
            },
          },
        },
      });

      return vote;
    });

    const updatedSession = await getVoteSessionByCode(votingSession.code);
    // Revalidate the voting pages
    revalidatePath(`/vote/${sessionId}`);
    revalidatePath(`/vote/${sessionId}/result`);
    await pusherServer.trigger(`vote-channel-${sessionId}`, 'vote-updated', updatedSession);

    return {
      success: true,
      message: `Berhasil melakukan voting untuk ${result.candidate.name}`,
      data: result,
    };
  } catch (error) {
    console.error("Error in submitVote:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat melakukan voting. Silakan coba lagi.",
    };
  }
}



export async function getRecentVotes(userId: string) {
  const result = await prisma.votingSession.findMany({
    where: {
      candidates: {
        some: {
          votes: {
            some: {
              voterId: userId,
            },
          },
        },
      },
      isPublished: true,
    },
    include: {
      candidates: {
        include: {
          votes: true,
        },
      },
    },
  });

  return result.map((session) => ({
    id: session.id,
    title: session.title,
    code: session.code,
    from: session.from,
    to: session.to,
    candidates: session.candidates.map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      votes: candidate.votes.length,
      vision: candidate.vision,
      mission: candidate.mission,
      image: candidate.image,
    })),
  }));
}

export async function getVotesActive() {
  const result = await prisma.votingSession.findMany({
    where: {
      from: {
        lte: new Date(),
      },
      to: {
        gte: new Date(),
      },
      isPublished: true,
      isViewabled: true,
    },
    include: {
      candidates: {
        include: {
          votes: true,
        },
      },
    },
  });

  return result.map((session) => ({
    id: session.id,
    title: session.title,
    code: session.code,
    from: session.from,
    to: session.to,
    
    candidates: session.candidates.map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      votes: candidate.votes.length,
      vision: candidate.vision,
      mission: candidate.mission,
      image: candidate.image,
    })),
  }));
}



export async function getVotesNotActive() {
  const result = await prisma.votingSession.findMany({
    where: {
      from: {
        lt: new Date(),
      },
      isPublished: true,
    },
    include: {
      candidates: {
        include: {
          votes: true,
        },
      },
    },
  });

  return result.map((session) => ({
    id: session.id,
    title: session.title,
    code: session.code,
    from: session.from,
    to: session.to,
    candidates: session.candidates.map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      votes: candidate.votes.length,
      vision: candidate.vision,
      mission: candidate.mission,
      image: candidate.image,
    })),
  }));
}

export async function getVoteEnded() {
  const result = await prisma.votingSession.findMany({
    where: {
      to: {
        lt: new Date(),
      },
      isPublished: true,
    },
    include: {
      candidates: {
        include: {
          votes: true,
        },
      },
    },
  });

  return result.map((session) => ({
    id: session.id,
    title: session.title,
    code: session.code,
    from: session.from,
    to: session.to,
    candidates: session.candidates.map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      votes: candidate.votes.length,
      vision: candidate.vision,
      mission: candidate.mission,
      image: candidate.image,
    })),
  }));
}