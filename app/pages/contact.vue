<script setup lang="ts">
const { data: page } = await useAsyncData("contact", () =>
  queryCollection("contact").first()
);
</script>

<template>
  <UPage>
    <UPageSection
      :title="page?.hero.title"
      :description="page?.hero.description"
      :links="page?.hero.links"
    />
  </UPage>
</template>
