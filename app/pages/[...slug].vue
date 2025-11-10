<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});
</script>

<template>
  <UPage>
    <UPageBody>
      <UPageTitle :title="page?.title" />
    </UPageBody>
  </UPage>
</template>
