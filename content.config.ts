import { z } from "zod";
import { defineCollection } from "@nuxt/content";

const Image = z.object({
  src: z.string(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
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

const Page = z.object({
  title: z.string(),
  description: z.string(),
  hero: PageHero,
});

export const collections = {
  index: defineCollection({
    type: "page",
    source: "index.yml",
    schema: Page.extend({
      hero: PageHero,
      popularCategories: PageSection.extend({
        cards: z.array(PageCard),
      }),
      backgroundImage: Image,
    }),
  }),
};
