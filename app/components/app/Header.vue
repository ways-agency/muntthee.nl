<script setup lang="ts">
import { findPageChildren } from "@nuxt/content/utils";
import type { NavigationMenuItem } from "@nuxt/ui";
import { mapContentNavigation } from "@nuxt/ui/runtime/utils/content.js";

const route = useRoute();

const { data: categories } = await useAsyncData(
  "header-categories",
  () => queryCollectionNavigation("categories"),
  {
    transform: (data) => {
      const items = mapContentNavigation(findPageChildren(data, "/blog"), {
        deep: 0,
      })
        .slice(0, 5)
        .map((item) => ({
          ...item,
          active: route.path.startsWith(item.to ?? ""),
        }));

      items.push({
        label: "Alle categorieën",
        to: "/blog",
        active: route.path === "/blog",
      });

      return items;
    },
  }
);

const items = computed<NavigationMenuItem[] | NavigationMenuItem[][]>(() => [
  {
    label: "Home",
    to: "/",
    active: route.path === "/",
  },
  {
    label: "Blog",
    to: "/blog",
    active: route.path === "/blog",
  },
  {
    label: "Categorieën",
    active: route.path.startsWith("/blog/"),
    children: categories.value,
  },
  {
    label: "Over ons",
    to: "/over-ons",
    active: route.path === "/over-ons",
  },
  {
    label: "Contact",
    to: "/contact",
    active: route.path === "/contact",
  },
]);
</script>

<template>
  <UHeader title="Muntthee.nl">
    <UNavigationMenu :items content-orientation="vertical" />

    <template #body>
      <UNavigationMenu :items orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
