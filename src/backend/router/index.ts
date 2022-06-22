import { z } from "zod";
import { google } from "googleapis";
import { getChannelFromSnippet } from "@/backend/utils/yt";
import { TRPCError } from "@trpc/server";
import { createRouter } from "@/backend/utils/context";

export const appRouter = createRouter()
  .query("yt-search", {
    input: z.object({ username: z.string() }),
    async resolve({ input }) {
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
  .query("secret", {
    resolve: ({ ctx }) => {
      if (!ctx.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return {
        secret: "sauce",
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
