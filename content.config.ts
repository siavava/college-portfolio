import { defineCollection, z } from "@nuxt/content";

export const collections = {
  pages: defineCollection({
    type: "page",
    source: "*.md",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      navigation: z.object({
        title: z.string(),
      }),
      layout: z.string(),
    }),
  }),

  jobs: defineCollection({
    type: "page",
    source: "jobs/**/*.md",
    schema: z.object({
      date: z.string(),
      title: z.string(),
      company: z.string(),
      location: z.string(),
      start: z.string(),
      end: z.string(),
      url: z.string(),
    }),
  }),

  profile: defineCollection({
    type: "page",
    source: "profile/brief/*.md",
    schema: z.object({
      name: z.string(),
      callout: z.string(),
    })
  }),

  contact: defineCollection({
    type: "page",
    source: "profile/contact/*.md",
    schema: z.object({
      email: z.string(),
      links: z.array(
        z.object({
          name: z.string(),
          url: z.string(),
          username: z.string(),
        })
      )
    })
  }),

  projects: defineCollection({
    type: "page",
    source: "projects/**/*.md",
    schema: z.object({
      order: z.number(),
      date: z.string(),
      title: z.string(),
      repo: z.string().optional(),
      tech: z.array(z.string()),
      featured: z.boolean().optional(),
      tag: z.string(),
      url: z.string().optional(),
    })
  }),

  education: defineCollection({
    type: "page",
    source: "school/**/*.md",
    schema: z.object({
      date: z.string(),
      title: z.string(),
      school: z.string(),
      location: z.string(),
      start: z.string(),
      end: z.string(),
      url: z.string(),
    })
  })
}
