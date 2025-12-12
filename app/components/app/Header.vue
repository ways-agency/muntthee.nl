<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const { categories } = useBlog();

const items = computed<NavigationMenuItem[] | NavigationMenuItem[][]>(() => [
  {
    label: "Home",
    to: "/",
    active: route.path === "/",
  },
  {
    label: "Categorieën",
    active: route.path.startsWith("/categorie/"),
    children: categories.value?.map((category) => ({
      ...category,
      label: category.title,
    })),
  },
  {
    label: "Blog",
    to: "/blog",
    active: route.path === "/blog",
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
  {
    label: "Test",
    to: "/testt",
    active: route.path === "/testt",
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
