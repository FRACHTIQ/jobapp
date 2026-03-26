import type { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../../db.js";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional()
});

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (request, reply) => {
    const payload = authSchema.safeParse(request.body);
    if (!payload.success || !payload.data.name) {
      return reply.status(400).send({ message: "Invalid register payload." });
    }

    const { email, password, name } = payload.data;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return reply.status(409).send({ message: "User already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, passwordHash }
    });

    const token = await reply.jwtSign({ sub: user.id, email: user.email });
    return reply.send({
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  });

  app.post("/login", async (request, reply) => {
    const payload = authSchema.safeParse(request.body);
    if (!payload.success) {
      return reply.status(400).send({ message: "Invalid login payload." });
    }

    const { email, password } = payload.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return reply.status(401).send({ message: "Invalid credentials." });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return reply.status(401).send({ message: "Invalid credentials." });
    }

    const token = await reply.jwtSign({ sub: user.id, email: user.email });
    return reply.send({
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  });
}
