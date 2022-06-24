import { google } from "googleapis";
import { getChannelFromSnippet } from "@/backend/utils/yt";
import { createRouter } from "@/backend/utils/context";
import { zYTSearch } from "@/utils/validators";
import { subdirectoryRouter } from "@/backend/router/subdirectories";

const ytRouter = createRouter().query("search", {
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
});

export const appRouter = createRouter()
  .merge("yt.", ytRouter)
  .merge("sub.", subdirectoryRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
