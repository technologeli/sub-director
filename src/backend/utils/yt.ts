import { google, youtube_v3 } from "googleapis";

export const getChannelFromSnippet = (
  channel: youtube_v3.Schema$SearchResult
) => {
  const snip = channel.snippet;

  const name = snip?.title;
  const id = snip?.channelId;
  const thumbnailURL = snip?.thumbnails?.default?.url;

  return { id, name, thumbnailURL };
};

export const getChannelById = async (id: string) => {
  const service = google.youtube("v3");
  const channels = await service.channels.list({
    part: ["snippet"],
    maxResults: 1,
    id: [id],
    auth: process.env.GOOGLE_API_KEY,
  });

  return channels.data.items?.at(0);
};
