import type { FastifyInstance, FastifyRequest } from "fastify";
import { prisma } from "../../db.js";
import type { AuthRequest } from "../../types.js";

function toJobDto(job: {
  id: string;
  company: string;
  role: string;
  location: string;
  employment: string;
  experience: string;
  salaryPerMonth: number;
  colorHex: string;
  description: string;
  requirements: string[];
  isSaved?: boolean;
}) {
  return {
    id: job.id,
    company: job.company,
    role: job.role,
    location: job.location,
    employment: job.employment,
    experience: job.experience,
    salaryPerMonth: job.salaryPerMonth,
    colorHex: job.colorHex,
    description: job.description,
    requirements: job.requirements,
    isSaved: Boolean(job.isSaved)
  };
}

export async function jobsRoutes(app: FastifyInstance) {
  const withOptionalAuth = async (request: FastifyRequest) => {
    try {
      await request.jwtVerify();
    } catch (_error) {
      // Public request without token should still work.
    }
  };

  app.get("/", { preHandler: [withOptionalAuth] }, async (request) => {
    const authRequest = request as AuthRequest;
    const userId = authRequest.user?.sub;

    if (!userId) {
      const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
      return jobs.map((job) => toJobDto({ ...job, isSaved: false }));
    }

    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        savedBy: {
          where: { userId },
          select: { id: true }
        }
      }
    });

    return jobs.map((job) => toJobDto({ ...job, isSaved: job.savedBy.length > 0 }));
  });

  app.get("/:id", { preHandler: [withOptionalAuth] }, async (request, reply) => {
    const authRequest = request as AuthRequest;
    const userId = authRequest.user?.sub;
    const { id } = request.params as { id: string };

    const job = userId
      ? await prisma.job.findUnique({
          where: { id },
          include: {
            savedBy: {
              where: { userId },
              select: { id: true }
            }
          }
        })
      : await prisma.job.findUnique({ where: { id } });

    if (!job) {
      return reply.status(404).send({ message: "Job not found." });
    }

    return toJobDto({
      ...job,
      isSaved: userId && "savedBy" in job ? ((job as { savedBy: { id: string }[] }).savedBy.length > 0) : false
    });
  });

  app.post("/:id/save", { preHandler: [app.authenticate] }, async (request, reply) => {
    const authRequest = request as AuthRequest;
    const userId = authRequest.user.sub;
    const { id: jobId } = request.params as { id: string };

    await prisma.savedJob.upsert({
      where: { userId_jobId: { userId, jobId } },
      update: {},
      create: { userId, jobId }
    });

    return reply.send({ ok: true });
  });

  app.delete("/:id/save", { preHandler: [app.authenticate] }, async (request, reply) => {
    const authRequest = request as AuthRequest;
    const userId = authRequest.user.sub;
    const { id: jobId } = request.params as { id: string };

    await prisma.savedJob
      .delete({
        where: { userId_jobId: { userId, jobId } }
      })
      .catch(() => null);

    return reply.send({ ok: true });
  });

  app.post("/:id/apply", { preHandler: [app.authenticate] }, async (request, reply) => {
    const authRequest = request as AuthRequest;
    const userId = authRequest.user.sub;
    const { id: jobId } = request.params as { id: string };

    await prisma.application.upsert({
      where: { userId_jobId: { userId, jobId } },
      update: { status: "submitted" },
      create: { userId, jobId, status: "submitted" }
    });

    return reply.send({ ok: true });
  });
}
