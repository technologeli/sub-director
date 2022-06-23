import { google } from "googleapis";
import { getChannelFromSnippet } from "@/backend/utils/yt";
import { TRPCError } from "@trpc/server";
import { createRouter } from "@/backend/utils/context";
import { prisma } from "@/backend/utils/prisma";
import { zSubDirectory, zYTSearch } from "@/utils/validators";

export const appRouter = createRouter()
  .query("yt-search", {
    input: zYTSearch,
    resolve: async ({ input }) => {
      if (input.username === "") return { channels: [] };
      const service = google.youtube("v3");
      const channels = await service.search.list({
        part: ["snippet"],
        maxResults: 10,
        q: input.username,
        type: ["channel"],
        auth: process.env.GOOGLE_API_KEY,
      });
      return {
        channels: channels.data.items?.map((channel) =>
          getChannelFromSnippet(channel)
        ),
      };
    },
  })
  .query("subdirectories", {
    resolve: async ({ ctx }) => {
      if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" });

      const subDirectories = await prisma.subDirectory.findMany({
        where: { user: { id: ctx.session.user.id } },
      });

      return { subDirectories };
    },
  })
  .mutation("subdirectories", {
    input: zSubDirectory,
    resolve: async ({ input, ctx }) => {
      if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" });
      const subDirectory = await prisma.subDirectory.create({
        data: {
          userId: ctx.session.user.id,
          name: input.name,
        },
      });
      return { subDirectory };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
