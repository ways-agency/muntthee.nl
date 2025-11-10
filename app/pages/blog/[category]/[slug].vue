<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});
</script>

<template>
  <UContainer>
    <UPage>
      <UPageBody>
        <UPageHeader :title="page?.title" :description="page?.description" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
