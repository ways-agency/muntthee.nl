<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

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
    children: [
      {
        label: "Thee & Gezondheid",
        to: "/blog/gezondheid",
        active: route.path.startsWith("/blog/gezondheid"),
      },
      {
        label: "Thee Accessoires",
        to: "/blog/accessoires",
        active: route.path.startsWith("/blog/accessoires"),
      },
      {
        label: "Thee Cadeaus",
        to: "/blog/cadeaus",
        active: route.path.startsWith("/blog/cadeaus"),
      },
      {
        label: "Zelf Muntthee Maken",
        to: "/blog/zelf-muntthee-maken",
        active: route.path.startsWith("/blog/zelf-muntthee-maken"),
      },
    ],
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
