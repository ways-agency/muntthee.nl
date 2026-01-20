<script lang="ts" setup>
const route = useRoute();
const slug = route.params.slug;

const { data: categorie } = await useAsyncData(`${slug}--categorie`, () =>
  queryCollection("categories").path(route.path).first(),
);
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="categorie?.title"
        :description="categorie?.description"
      />

      <UPageBody>
        <BlogOverview />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
