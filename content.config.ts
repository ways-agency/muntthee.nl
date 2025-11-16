import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

const Image = z.object({
  src: z.string(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const Avatar = z.object({
  src: z.string(),
  alt: z.string().optional(),
});

const Button = z.object({
  label: z.string(),
  icon: z.string().optional(),
  leadingIcon: z.string().optional(),
  trailingIcon: z.string().optional(),
  to: z.string().optional(),
  target: z.enum(["_blank", "_self"]).optional(),
  color: z
    .enum(["primary", "neutral", "success", "warning", "error", "info"])
    .optional(),
  size: z.enum(["xs", "sm", "md", "lg", "xl"]).optional(),
  variant: z
    .enum(["solid", "outline", "subtle", "soft", "ghost", "link"])
    .optional(),
  id: z.string().optional(),
  class: z.string().optional(),
});

const PageCard = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  to: z.string().optional(),
  target: z.enum(["_blank", "_self"]).optional(),
});

const PageFeature = z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.string(),
  to: z.string().optional(),
  target: z.enum(["_blank", "_self"]).optional(),
});

const PageHero = z.object({
  title: z.string(),
  description: z.string(),
  links: z.array(Button).optional(),
});

const PageSection = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  links: z.array(Button).optional(),
  features: z.array(PageFeature).optional(),
});

const PageHeader = z.object({
  title: z.string(),
  description: z.string(),
});

const Page = z.object({
  title: z.string(),
  description: z.string(),
  hero: PageHero,
});

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: "page",
      source: "index.yml",
      schema: Page.extend({
        hero: PageHero.extend({
          background_image: Image.optional(),
        }),
        popular_categories: PageSection.extend({
          cards: z.array(PageCard).optional(),
        }),
        about_us: PageSection.extend({
          image: Image.optional(),
          links: z.array(Button).optional(),
        }),
        latest_articles: PageSection,
      }),
    }),
    about_us: defineCollection({
      type: "page",
      source: "over-ons.yml",
      schema: z.object({
        about_us: z.object({
          title: z.string(),
          description: z.string(),
          image: Image.optional(),
        }),
      }),
    }),
    blog: defineCollection({
      type: "page",
      source: "blog/index.yml",
      schema: PageHeader,
    }),
    categories: defineCollection({
      type: "page",
      source: "blog/*/*.yml",
      schema: PageHeader,
    }),
    articles: defineCollection({
      type: "page",
      source: "blog/*/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        featured_image: z.string().optional(),
        author: z.string().optional(),
        published_time: z.string().optional(),
        modified_time: z.string().optional(),
      }),
    }),
    contact: defineCollection({
      type: "page",
      source: "contact.yml",
      schema: z.object({
        hero: PageSection,
      }),
    }),
    authors: defineCollection({
      type: "page",
      source: "authors/*.json",
      schema: z.object({
        name: z.string(),
        avatar: Avatar,
        bio: z.string(),
      }),
    }),
  },
});
