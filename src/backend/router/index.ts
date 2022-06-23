import { z } from "zod";
import { google } from "googleapis";
import { getChannelFromSnippet } from "@/backend/utils/yt";
import { TRPCError } from "@trpc/server";
import { createRouter } from "@/backend/utils/context";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = createRouter()
  .query("yt-search", {
    input: z.object({ username: z.string() }),
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
        where: {
          user: {
            id: ctx.session.user.id,
          },
        },
      });

      return { subDirectories };
    },
  })
  .mutation("subdirectories", {
    input: z.object({
      name: z.string().min(1, { message: "Required" }),
    }),
    resolve: async ({ input, ctx }) => {
      if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" });
      console.log(ctx.session.user.id, input.name);
      // need user id somehow
      // const subDirectory = await prisma.subDirectory.create({
      //
      // });
      return {
        name: input.name,
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
