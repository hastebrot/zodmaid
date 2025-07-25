import { z } from "zod/v4";

const schema = <T extends z.ZodType>(meta: z.core.JSONSchemaMeta, schema: T) => {
  return meta !== undefined ? schema.meta(meta) : schema;
};

export type MusicLibraryGenre = z.infer<typeof MusicLibraryGenre>;
export const MusicLibraryGenre = z.enum([
  "Classic",
  "Country",
  "Folk",
  "Jazz",
  "Pop",
  "Pop punk",
  "Punk",
  "Punk rock",
  "Rap",
  "Rock",
  "R&B",
  "Other",
]);

export type MusicLibrarySchema = z.infer<typeof MusicLibrarySchema>;
export const MusicLibrarySchema = schema(
  { title: "Music Library", description: "Schema defining a music library" },
  z.strictObject({
    Title: z.string(),
    Artists: z.array(
      schema(
        { title: "Artist" },
        z.strictObject({
          Name: z.string().min(1),
          Albums: z.array(
            schema(
              { title: "Album" },
              z.strictObject({
                Name: z.string().min(1),
                Genre: z.union([MusicLibraryGenre, z.array(MusicLibraryGenre).min(1)]).optional(),
                ReleaseDate: z
                  .string()
                  .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
                  .optional(),
                Label: z.string(),
                Tracks: z
                  .array(
                    schema(
                      { title: "Track" },
                      z.strictObject({
                        Title: z.string().min(1),
                        Duration: z
                          .string()
                          .regex(/^[0-9]{2}:[0-9]{2}$/)
                          .optional(),
                        Writer: z.string().min(1).optional(),
                      }),
                    ),
                  )
                  .min(1),
              }),
            ),
          ),
        }),
      ),
    ),
  }),
);
