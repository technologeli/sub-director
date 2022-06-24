import { createRouter } from "@/backend/utils/context";
import { zSubDirectory } from "@/utils/validators";
import { prisma } from "@/backend/utils/prisma";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

export const subdirectoryRouter = createRouter()
  .query("list", {
    resolve: async ({ ctx }) => {
      if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" });

      const subDirectories = await prisma.subDirectory.findMany({
        where: { user: { id: ctx.session.user.id } },
      });

      return { subDirectories };
    },
  })
  .mutation("create", {
    input: zSubDirectory,
    resolve: async ({ input, ctx }) => {
      if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" });
      const subDirectory = await prisma.subDirectory
        .create({
          data: {
            userId: ctx.session.user.id,
            name: input.name,
          },
        })
        .catch((e) => {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
              throw new TRPCError({
                code: "CONFLICT",
                message: `You already have a subdirectory named ${input.name}.`,
              });
            }
          }
        });
      return { subDirectory };
    },
  });
