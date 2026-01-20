<script lang="ts" setup>
const { data: page } = await useAsyncData("blog", () =>
  queryCollection("blog").first(),
);
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :title="page?.title" :description="page?.description" />

      <UPageBody>
        <BlogOverview />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
