<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const { categories } = useBlog();

const items = computed<NavigationMenuItem[] | NavigationMenuItem[][]>(() => [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Categorieën",
    active: route.path.startsWith("/blog"),
    children: categories.value?.map((category) => ({
      ...category,
      label: category.title,
    })),
  },
  {
    label: "Over ons",
    to: "/over-ons",
  },
  {
    label: "Contact",
    to: "/contact",
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
