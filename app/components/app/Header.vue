<script setup lang="ts">
import { findPageChildren } from "@nuxt/content/utils";
import type { NavigationMenuItem } from "@nuxt/ui";
import { mapContentNavigation } from "@nuxt/ui/runtime/utils/content.js";

const route = useRoute();

const { data: categories } = await useAsyncData(
  "header-categories",
  () => queryCollectionNavigation("categories"),
  {
    transform: (data) =>
      mapContentNavigation(findPageChildren(data, "/blog")).map((item) => ({
        ...item,
        active: route.path.startsWith(item.to ?? ""),
      })),
  }
);

console.log(categories.value);

const items = computed<NavigationMenuItem[]>(() => [
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
    active: route.path.startsWith("/over-ons"),
  },
  {
    label: "Contact",
    to: "/contact",
    active: route.path.startsWith("/contact"),
  },
]);
</script>

<template>
  <UHeader title="Muntthee.nl">
    <UNavigationMenu :items="items" content-orientation="vertical" />
  </UHeader>
</template>
