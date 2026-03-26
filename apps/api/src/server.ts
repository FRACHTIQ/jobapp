import "dotenv/config";
import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { authRoutes } from "./modules/auth/routes.js";
import { jobsRoutes } from "./modules/jobs/routes.js";
import { prisma } from "./db.js";
import type { JwtPayload } from "./types.js";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: JwtPayload;
  }
}

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });
await app.register(jwt, {
  secret: process.env.JWT_SECRET ?? "dev-secret"
});

app.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      await request.jwtVerify();
    } catch (_error) {
      await reply.status(401).send({ message: "Unauthorized." });
    }
  }
);

app.get("/health", async () => ({ status: "ok" }));
app.register(authRoutes, { prefix: "/auth" });
app.register(jobsRoutes, { prefix: "/jobs" });

const port = Number(process.env.PORT ?? 4000);
await app.listen({ port, host: "0.0.0.0" });

async function gracefulShutdown() {
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
