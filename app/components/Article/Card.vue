<script setup lang="ts">
import type { PageCardProps } from "@nuxt/ui";

defineProps<{
  article: PageCardProps;
}>();
</script>

<template>
  <UPageCard
    :title="article.title"
    :description="article.description"
    :to="article.path"
  />
</template>
