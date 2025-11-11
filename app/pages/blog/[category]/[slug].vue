<script setup lang="ts">
const route = useRoute();
const { data: article } = await useAsyncData(route.path, () => {
  return queryCollection("articles").path(route.path).first();
});

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings("articles", route.path);
});
</script>

<template>
  <UContainer v-if="article">
    <UPage>
      <UPageHeader :title="article.title" :description="article.description" />

      <UPageBody>
        <ContentRenderer :value="article" />

        <USeparator />

        <UContentSurround v-if="surround" :surround="surround" />
      </UPageBody>

      <template v-if="article.body?.toc?.links" #right>
        <UContentToc :links="article.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
