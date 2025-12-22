import type { PageCardProps } from "@nuxt/ui";
import { upperFirst } from "es-toolkit/string";

export const useBlog = () => {
  const route = useRoute();

  console.log(route.query.categorie);

  const { data: articles } = useAsyncData("articles", () =>
    queryCollection("articles").all(),
  );

  const { data: categories } = useAsyncData(
    "categories",
    () => queryCollection("categories").all(),
    {
      transform: async (data) => {
        let items: (PageCardProps & { count: number; active: boolean })[] =
          await Promise.all(
            data.map(async (item) => {
              const count = await queryCollection("articles")
                .where("category", "=", upperFirst(item.title))
                .count();

              return {
                title: item.title,
                description: item.description,
                icon: item.icon,
                to: {
                  path: "/blog",
                  query: {
                    categorie: item.title,
                  },
                },
                exactQuery: true,
                count,
                active: route.query.categorie === item.title,
              };
            }),
          );

        // Actually filter to only keep items with count > 0
        items = items.filter((item) => item.count > 0);

        items.push({
          title: "Alle categorieën",
          description: "Ontdek alle categorieën van muntthee.nl",
          icon: "i-lucide-list",
          to: "/blog",
          count: articles.value?.length ?? 0,
          active: route.query.categorie === undefined,
        });

        return items;
      },
      watch: [() => route.query.categorie],
    },
  );

  return {
    categories,
  };
};
