<script lang="ts" setup>
import { upperFirst } from "es-toolkit/string";

const { path, params } = useRoute();

const { data: page } = await useAsyncData(
  `categorie--${params.categorie}`,
  () => queryCollection("categories").path(path).first(),
);

const { data: total } = await useAsyncData(
  `categorie--${params.categorie}--total`,
  () =>
    queryCollection("articles")
      .where("category", "=", upperFirst(params.categorie as string))
      .count(),
);

useRobotsRule(total.value && total.value > 0 ? true : false);
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :description="page?.description">
        <template #title>
          {{ page?.title }}
          <small class="text-primary-300 text-base">({{ total }})</small>
        </template>

        <BlogCategoryCarousel />
      </UPageHeader>

      <UPageBody>
        <BlogOverview />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
