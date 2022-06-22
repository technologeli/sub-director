import * as trpc from "@trpc/server";
import { z } from "zod";
import { google, youtube_v3 } from "googleapis";

const getChannel = (channel: youtube_v3.Schema$SearchResult) => {
  const snip = channel.snippet;

  const name = snip?.title;
  const id = snip?.channelId;
  const thumbnailURL = snip?.thumbnails?.default?.url;

  return { id, name, thumbnailURL };
};

export const appRouter = trpc
  .router()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("yt-search", {
    input: z.object({ username: z.string() }),
    async resolve({ input }) {
      const service = google.youtube("v3");
      const channels = await service.search.list({
        part: ["snippet"],
        maxResults: 25,
        q: input.username,
        type: ["channel"],
        auth: process.env.GOOGLE_API_KEY,
      });
      return {
        channels: channels.data.items?.map((channel) => getChannel(channel)),
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
