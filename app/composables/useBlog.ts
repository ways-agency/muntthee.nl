import type { PageCardProps } from "@nuxt/ui";

export const useBlog = () => {
  const { data: categories } = useAsyncData(
    "categories",
    () => queryCollection("categories").all(),
    {
      transform: (data) => {
        const items: PageCardProps[] = data.map((item) => ({
          title: item.title,
          description: item.description,
          icon: item.icon,
          to: item.path,
        }));

        items.push({
          title: "Alle categorieën",
          description: "Ontdek alle categorieën van muntthee.nl",
          icon: "i-lucide-list",
          to: "/blog",
        });

        return items;
      },
    }
  );

  return {
    categories,
  };
};
