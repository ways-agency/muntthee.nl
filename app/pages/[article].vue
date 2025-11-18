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
  new Date(article.value?.published_time ?? ""),
  { dateStyle: "medium" }
);
const modifiedTime = formatter.custom(
  new Date(article.value?.modified_time ?? ""),
  { dateStyle: "medium" }
);

useSchemaOrg([
  defineArticle({
    "@type": "BlogPosting",
    author: {
      name: author?.value?.name,
      url: "/auteurs/" + author?.value?.path,
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    headline: article?.value?.title,
    image: article?.value?.featured_image,
  }),
]);
</script>

<template>
  <UContainer v-if="article">
    <UPageHero
      :title="article.title"
      :description="article.description"
      :ui="{
        container: 'gap-6 py-10 sm:gap-y-8 sm:py-10 lg:py-10',
        wrapper: 'text-left',
        title: 'text-inverted lg:text-5xl',
        description: 'max-w-prose text-primary-100',
      }"
    >
      <template #footer>
        <ul class="flex flex-wrap gap-4 items-center text-sm text-primary-100">
          <li>
            <UUser
              :name="author?.name"
              :avatar="author?.avatar"
              :ui="{
                name: 'text-primary-100',
              }"
            />
          </li>
          <li>
            <p>Gepubliceerd op {{ publishedTime }}</p>
          </li>
          <li>
            <p>Laatst bijgewerkt op {{ modifiedTime }}</p>
          </li>
        </ul>
      </template>

      <NuxtPicture
        class="rounded-b-xl overflow-hidden aspect-video size-full absolute inset-0 -z-10 bg-black"
        :src="article.featured_image"
        :alt="article.title"
        :img-attrs="{
          class: 'size-full object-cover opacity-40',
          fetchpriority: 'high',
          loading: 'eager',
          width: '714',
          height: '402',
        }"
      />
    </UPageHero>

    <UPage>
      <template v-if="article.body?.toc?.links" #left>
        <UContentToc
          :links="article.body.toc.links"
          title="In dit artikel"
          highlight
        />
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
