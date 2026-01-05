<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = computed<NavigationMenuItem[] | NavigationMenuItem[][]>(() => [
  {
    label: "Home",
    to: "/",
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
