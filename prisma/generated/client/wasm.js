
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  nim: 'nim',
  password: 'password',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AccountScalarFieldEnum = {
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.AuthenticatorScalarFieldEnum = {
  credentialID: 'credentialID',
  userId: 'userId',
  providerAccountId: 'providerAccountId',
  credentialPublicKey: 'credentialPublicKey',
  counter: 'counter',
  credentialDeviceType: 'credentialDeviceType',
  credentialBackedUp: 'credentialBackedUp',
  transports: 'transports'
};

exports.Prisma.VotingSessionScalarFieldEnum = {
  id: 'id',
  title: 'title',
  from: 'from',
  to: 'to',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  code: 'code',
  publisher: 'publisher',
  isPublished: 'isPublished',
  isViewabled: 'isViewabled'
};

exports.Prisma.CandidateScalarFieldEnum = {
  id: 'id',
  name: 'name',
  vision: 'vision',
  mission: 'mission',
  sessionId: 'sessionId',
  image: 'image',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VoteScalarFieldEnum = {
  id: 'id',
  candidateId: 'candidateId',
  createdAt: 'createdAt',
  voterId: 'voterId',
  sessionId: 'sessionId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.USerRole = exports.$Enums.USerRole = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

exports.Prisma.ModelName = {
  User: 'User',
  Account: 'Account',
  Session: 'Session',
  VerificationToken: 'VerificationToken',
  Authenticator: 'Authenticator',
  VotingSession: 'VotingSession',
  Candidate: 'Candidate',
  Vote: 'Vote'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\utaki\\coding\\next-js\\vote-rpl\\prisma\\generated\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "C:\\Users\\utaki\\coding\\next-js\\vote-rpl\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"driverAdapters\"]\n  output          = \"./generated/client\"\n}\n\ndatasource db {\n  provider  = \"postgresql\"\n  url       = env(\"DATABASE_URL\")\n  directUrl = env(\"DATABASE_URL_UNPOOLED\")\n}\n\nenum USerRole {\n  USER\n  ADMIN\n}\n\nmodel User {\n  id            String          @id @default(cuid())\n  name          String?\n  email         String          @unique\n  emailVerified DateTime?\n  image         String?\n  nim           String?         @unique\n  password      String?\n  role          USerRole        @default(USER)\n  accounts      Account[]\n  sessions      Session[]\n  votes         Vote[]\n  // Optional for WebAuthn support\n  Authenticator Authenticator[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map(\"users\")\n}\n\nmodel Account {\n  userId            String\n  type              String\n  provider          String\n  providerAccountId String\n  refresh_token     String?\n  access_token      String?\n  expires_at        Int?\n  token_type        String?\n  scope             String?\n  id_token          String?\n  session_state     String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@id([provider, providerAccountId])\n  @@map(\"accounts\")\n}\n\nmodel Session {\n  sessionToken String   @unique\n  userId       String\n  expires      DateTime\n  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map(\"sessions\")\n}\n\nmodel VerificationToken {\n  identifier String\n  token      String\n  expires    DateTime\n\n  @@id([identifier, token])\n  @@map(\"verification_tokens\")\n}\n\nmodel Authenticator {\n  credentialID         String  @unique\n  userId               String\n  providerAccountId    String\n  credentialPublicKey  String\n  counter              Int\n  credentialDeviceType String\n  credentialBackedUp   Boolean\n  transports           String?\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@id([userId, credentialID])\n}\n\nmodel VotingSession {\n  id          String      @id @default(cuid())\n  title       String\n  from        DateTime\n  to          DateTime\n  candidates  Candidate[] @relation(\"VotingSessionCandidates\")\n  createdAt   DateTime    @default(now())\n  updatedAt   DateTime    @updatedAt\n  code        String      @unique\n  publisher   String\n  Vote        Vote[]\n  isPublished Boolean\n  isViewabled Boolean\n\n  @@map(\"voting_sessions\")\n}\n\nmodel Candidate {\n  id        String        @id @default(cuid())\n  name      String\n  vision    String\n  mission   String\n  votes     Vote[]\n  sessionId String\n  image     String\n  session   VotingSession @relation(fields: [sessionId], references: [id], onDelete: Cascade, name: \"VotingSessionCandidates\")\n  createdAt DateTime      @default(now())\n  updatedAt DateTime      @updatedAt\n\n  @@map(\"candidates\")\n}\n\nmodel Vote {\n  id          String        @id @default(cuid())\n  candidateId String\n  candidate   Candidate     @relation(fields: [candidateId], references: [id], onDelete: Cascade)\n  createdAt   DateTime      @default(now())\n  voterId     String\n  voter       User          @relation(fields: [voterId], references: [id], onDelete: Cascade)\n  sessionId   String\n  session     VotingSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)\n\n  @@map(\"votes\")\n}\n",
  "inlineSchemaHash": "35da52807185495fe05509bff594498c91d1b25d80f815b2bdc5c61e53f0beeb",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"emailVerified\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nim\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"USerRole\"},{\"name\":\"accounts\",\"kind\":\"object\",\"type\":\"Account\",\"relationName\":\"AccountToUser\"},{\"name\":\"sessions\",\"kind\":\"object\",\"type\":\"Session\",\"relationName\":\"SessionToUser\"},{\"name\":\"votes\",\"kind\":\"object\",\"type\":\"Vote\",\"relationName\":\"UserToVote\"},{\"name\":\"Authenticator\",\"kind\":\"object\",\"type\":\"Authenticator\",\"relationName\":\"AuthenticatorToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"users\"},\"Account\":{\"fields\":[{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"provider\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"providerAccountId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"refresh_token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"access_token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expires_at\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"token_type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"scope\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"id_token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"session_state\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AccountToUser\"}],\"dbName\":\"accounts\"},\"Session\":{\"fields\":[{\"name\":\"sessionToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expires\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"SessionToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"sessions\"},\"VerificationToken\":{\"fields\":[{\"name\":\"identifier\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expires\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"verification_tokens\"},\"Authenticator\":{\"fields\":[{\"name\":\"credentialID\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"providerAccountId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"credentialPublicKey\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"counter\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"credentialDeviceType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"credentialBackedUp\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"transports\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AuthenticatorToUser\"}],\"dbName\":null},\"VotingSession\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"from\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"to\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"candidates\",\"kind\":\"object\",\"type\":\"Candidate\",\"relationName\":\"VotingSessionCandidates\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"code\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"publisher\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"Vote\",\"kind\":\"object\",\"type\":\"Vote\",\"relationName\":\"VoteToVotingSession\"},{\"name\":\"isPublished\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"isViewabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"}],\"dbName\":\"voting_sessions\"},\"Candidate\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"vision\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mission\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"votes\",\"kind\":\"object\",\"type\":\"Vote\",\"relationName\":\"CandidateToVote\"},{\"name\":\"sessionId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"session\",\"kind\":\"object\",\"type\":\"VotingSession\",\"relationName\":\"VotingSessionCandidates\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"candidates\"},\"Vote\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"candidateId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"candidate\",\"kind\":\"object\",\"type\":\"Candidate\",\"relationName\":\"CandidateToVote\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"voterId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"voter\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToVote\"},{\"name\":\"sessionId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"session\",\"kind\":\"object\",\"type\":\"VotingSession\",\"relationName\":\"VoteToVotingSession\"}],\"dbName\":\"votes\"}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

