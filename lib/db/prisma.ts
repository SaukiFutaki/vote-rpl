import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { withPulse } from "@prisma/extension-pulse/workerd"
const prismaClientSingleton = () => {
  // TODO: Make this edge-compatible
  const neon = new Pool({connectionString: process.env.DATABASE_URL});
  const adapter = new PrismaNeon(neon);

  return new PrismaClient({adapter})
  .$extends( withPulse({
    apiKey: process.env['PULSE_API_KEY'] as string
  }));
};


declare const globalThis : {
    prismaGlobal : ReturnType <typeof prismaClientSingleton>
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}