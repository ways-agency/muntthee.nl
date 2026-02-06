<script setup lang="ts">
const route = useRoute();

const { data: article } = await useAsyncData(route.path, () =>
  queryCollection("articles").path(route.path).first(),
);

// Return 404 when article is missing (prevents prerender 500s)
if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Artikel niet gevonden",
  });
}

useSeoMeta(article?.value?.seo || {});

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings("articles", route.path);
});

const { data: author } = await useAsyncData(`${route.path}-author`, () =>
  queryCollection("authors").first(),
);

const {
  locale: {
    value: { code: localeCode },
  },
} = useLocale();

const DATE_FORMAT = "DD MMMM YYYY";
const DATE_OPTIONS = { locales: localeCode };

const datePublished = useDateFormat(
  article?.value?.datePublished,
  DATE_FORMAT,
  DATE_OPTIONS,
);

const dateModified = useDateFormat(
  article?.value?.dateModified,
  DATE_FORMAT,
  DATE_OPTIONS,
);

// useSchemaOrg([
//   defineArticle({
//     "@type": "BlogPosting",
//     author: {
//       name: author?.value?.name,
//       url: "/auteurs/" + author?.value?.path,
//     },
//     datePublished: publishedTime,
//     dateModified: modifiedTime,
//     headline: article?.value?.title,
//     image: article?.value?.featuredImage,
//   }),
// ]);
</script>

<template>
  <article>
    <UPageHero
      :title="article?.title"
      :description="article?.description"
      :ui="{
        container:
          'gap-6 py-12 sm:gap-y-8 sm:py-14 lg:py-18 relative @container',
        wrapper: 'text-left',
        title: 'text-inverted sm:text-5xl lg:text-5xl',
        description: 'max-w-prose text-primary-100',
      }"
    >
      <template #footer>
        <ul
          class="text-primary-100 flex flex-col flex-wrap gap-4 text-sm sm:flex-row sm:items-center"
        >
          <li>
            <p>Gepubliceerd op {{ datePublished }}</p>
          </li>
          <li>
            <p>Laatst bijgewerkt op {{ dateModified }}</p>
          </li>
        </ul>
      </template>

      <NuxtPicture
        class="container:rounded-b-xl absolute inset-0 -z-10 aspect-video size-full overflow-hidden bg-black"
        :src="article?.featuredImage?.src"
        :alt="article?.featuredImage?.alt"
        :img-attrs="{
          class: 'size-full object-cover opacity-40 []',
          fetchpriority: 'high',
          loading: 'eager',
          width: '714',
          height: '402',
        }"
      />
    </UPageHero>

    <UContainer>
      <UPage
        :ui="{
          center: 'lg:col-span-7',
          right: 'lg:col-span-3',
        }"
      >
        <UPageBody>
          <ContentRenderer v-if="article" :value="article" />

          <USeparator />

          <UContentSurround v-if="surround" :surround="surround" />
        </UPageBody>

        <template #right>
          <UPageAside class="lg:pe-0">
            <AuthorCard
              v-if="author"
              :name="author.name"
              :description="author.description"
              :avatar="author.avatar"
            />

            <UContentToc
              :links="article?.body?.toc?.links"
              title="In dit artikel"
              highlight
            />
          </UPageAside>
        </template>
      </UPage>
    </UContainer>
  </article>
</template>
