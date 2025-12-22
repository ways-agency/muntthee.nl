<script setup lang="ts">
import { useDateFormatter } from "reka-ui";

const route = useRoute();

const { data: article } = await useAsyncData(route.path, () => {
  return queryCollection("articles").path(route.path).first();
});

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings("articles", route.path);
});

const { data: author } = await useAsyncData(`${route.path}-author`, () =>
  queryCollection("authors").first(),
);

const { locale } = useLocale();
const formatter = useDateFormatter(locale.value.code);
const publishedTime = formatter.custom(
  new Date(article?.value?.published_time ?? ""),
  { dateStyle: "medium" },
);
const modifiedTime = formatter.custom(
  new Date(article?.value?.modified_time ?? ""),
  { dateStyle: "medium" },
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
            <p>Gepubliceerd op {{ publishedTime }}</p>
          </li>
          <li>
            <p>Laatst bijgewerkt op {{ modifiedTime }}</p>
          </li>
        </ul>
      </template>

      <NuxtPicture
        class="container:rounded-b-xl absolute inset-0 -z-10 aspect-video size-full overflow-hidden bg-black"
        :src="article?.featured_image"
        :alt="article?.title"
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
      <UPage>
        <template v-if="article?.body?.toc?.links" #left>
          <UContentToc
            :links="article.body.toc.links"
            title="In dit artikel"
            highlight
          />
        </template>
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
          </UPageAside>
        </template>
      </UPage>
    </UContainer>
  </article>
</template>
