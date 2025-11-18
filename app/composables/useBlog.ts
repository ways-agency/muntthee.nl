import type { PageCardProps } from "@nuxt/ui";
import { upperFirst } from "es-toolkit/string";

export const useBlog = () => {
  const { data: articles } = useAsyncData("articles", () =>
    queryCollection("articles").all()
  );

  const { data: categories } = useAsyncData(
    "categories",
    () => queryCollection("categories").all(),
    {
      transform: async (data) => {
        let items: (PageCardProps & { count: number })[] = await Promise.all(
          data.map(async (item) => {
            const count = await queryCollection("articles")
              .where("category", "=", upperFirst(item.title))
              .count();

            return {
              title: item.title,
              description: item.description,
              icon: item.icon,
              to: item.path,
              count,
            };
          })
        );

        // Actually filter to only keep items with count > 0
        items = items.filter((item) => item.count > 0);

        items.push({
          title: "Alle categorieën",
          description: "Ontdek alle categorieën van muntthee.nl",
          icon: "i-lucide-list",
          to: "/blog",
          count: articles.value?.length ?? 0,
        });

        return items;
      },
    }
  );

  return {
    categories,
  };
};
