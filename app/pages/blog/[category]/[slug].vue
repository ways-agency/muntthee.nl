<script setup lang="ts">
const route = useRoute();
const { data: article } = await useAsyncData(route.path, () => {
  return queryCollection("articles")
    .select("title", "description", "featured_image", "body")
    .path(route.path)
    .first();
});

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings("articles", route.path);
});
</script>

<template>
  <UContainer v-if="article">
    <UPage>
      <template #left><div /></template>

      <UPageHero
        :title="article.title"
        :description="article.description"
        :ui="{
          container: 'gap-6 py-10 sm:gap-y-8 sm:py-10 lg:py-10 px-0!',
        }"
      >
        <NuxtPicture
          class="rounded-xl overflow-hidden aspect-video w-full"
          :src="article.featured_image"
          :alt="article.title"
          :img-attrs="{
            class: 'size-full object-cover',
            fetchpriority: 'high',
            loading: 'eager',
            width: '714',
            height: '402',
          }"
        />
      </UPageHero>

      <template #right><div /></template>
    </UPage>

    <UPage>
      <template v-if="article.body?.toc?.links" #left>
        <UContentToc :links="article.body.toc.links" />
      </template>
      <UPageBody>
        <ContentRenderer :value="article" />

        <USeparator />

        <UContentSurround v-if="surround" :surround="surround" />
      </UPageBody>

      <template #right> Author etc. </template>
    </UPage>
  </UContainer>
</template>
