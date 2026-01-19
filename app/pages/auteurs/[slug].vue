<script setup lang="ts">
const route = useRoute();

const { data: author } = await useAsyncData(`${route.path}-author`, () =>
  queryCollection("authors").first(),
);

useRobotsRule(false);
</script>

<template>
  <UPageSection
    :title="author?.name"
    :description="author?.bio"
    orientation="horizontal"
  >
    <template #description>
      <p v-html="author?.bio.split('\n').join('<br />')" />
    </template>

    <NuxtPicture
      :src="author?.avatar?.src"
      :alt="author?.avatar?.alt"
      :img-attrs="{
        width: '576',
        height: '576',
        class: 'rounded-xl',
      }"
    />
  </UPageSection>
</template>
