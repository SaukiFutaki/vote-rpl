export interface IAvatarProps {
    urlAvatar ?: string;
    userName ?: string;
    email ?: string;
    userRole ?: string;
}

export interface IFormAuthProps {
    title ?: string;
    description ?: string;
    link ?: string;
    linkDesc ?: string;
}


export interface Candidate {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    vision: string;
    mission: string;
    sessionId: string;
    votes ?: number;
  }
  
 export  interface VoteSession {
    id?: string;
    title: string;
    code: string;
    from: Date;
    to: Date;
    createdAt: Date;
    updatedAt: Date;
    candidates?: Candidate[];
  }
  
 export interface VotingInterfaceProps {
    session: VoteSession;
  }
  