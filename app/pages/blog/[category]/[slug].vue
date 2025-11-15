<script setup lang="ts">
import { useDateFormatter } from "reka-ui";

const route = useRoute();

const { data: article } = await useAsyncData(route.path, () => {
  return queryCollection("articles")
    .select(
      "title",
      "description",
      "featured_image",
      "body",
      "author",
      "published_time",
      "modified_time"
    )
    .path(route.path)
    .first();
});

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings("articles", route.path);
});

const { data: author } = await useAsyncData(`${route.path}-author`, () =>
  queryCollection("authors").first()
);

const { locale } = useLocale();
const formatter = useDateFormatter(locale.value.code);
const publishedTime = formatter.custom(
  new Date(article.value?.published_time),
  { dateStyle: "medium" }
);
const modifiedTime = formatter.custom(new Date(article.value?.modified_time), {
  dateStyle: "medium",
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
        <template #footer>
          <ul class="flex flex-wrap gap-4 items-center justify-center text-sm">
            <li><UUser :name="author?.name" :avatar="author?.avatar" /></li>
            <li>
              <p>Gepubliceerd op {{ publishedTime }}</p>
            </li>
            <li>
              <p>Laatst bijgewerkt op {{ modifiedTime }}</p>
            </li>
          </ul>
        </template>

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

      <template #right><div /></template>
    </UPage>
  </UContainer>
</template>
