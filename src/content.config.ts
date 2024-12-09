// 1. Import utilities from `astro:content`
import { defineCollection, reference, z } from "astro:content";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

// 3. Define your collection(s)
const authors = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "src/data/authors" }),
  schema: z.object({
    name: z.string(),
    role: z.enum(["marketing", "dev", "design"]),
    location: z.string().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/data/posts" }),
  schema: ({}) =>
    z.object({
      title: z
        .string()
        .max(65, { message: "Title must be 65 characters or less" }),
      tags: z.array(z.string()),
      pubDate: z.date(),
      isDraft: z.boolean(),
      canonicalUrl: z.string().url().optional(),
      author: reference("team"),
    }),
});

const team = defineCollection({
  loader: file("src/data/team.json"),
  schema: z.object({
    name: z.string(),
    role: z.enum(["marketing", "dev", "design"]),
    location: z.string().optional(),
  }),
});

const postsWithImages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/data/nicePosts" }),
  schema: ({ image }) =>
    z.object({
      title: z
        .string()
        .max(65, { message: "Title must be 65 characters or less" }),
      tags: z.array(z.string()),
      pubDate: z.date(),
      isDraft: z.boolean(),
      canonicalUrl: z.string().url().optional(),
      cover: image().refine(
        (img) => {
          console.log(img.src);
          return true;
        },
        {
          message: "Cover image must be at least 500px wide",
        }
      ),
      coverAlt: z.string(),
      author: reference("authors"),
    }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/data/notes" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    pubDate: z.date().optional(),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { team, posts, authors, postsWithImages, notes };
