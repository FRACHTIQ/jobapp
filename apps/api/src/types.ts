import type { FastifyRequest } from "fastify";

export type JwtPayload = {
  sub: string;
  email: string;
};

export type AuthRequest = FastifyRequest & {
  user: JwtPayload;
};
