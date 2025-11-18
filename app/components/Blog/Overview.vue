<script lang="ts" setup>
import type {
  ArticlesCollectionItem,
  CollectionQueryBuilder,
} from "@nuxt/content";
import { kebabCase, upperFirst } from "es-toolkit/string";

const route = useRoute();
const { path, params, query } = route;

const page = ref(query.page ? parseInt(query.page as string) : 1);
const itemsPerPage = 2;
const skip = computed(() => (page.value - 1) * itemsPerPage);

const to = (page: number) => {
  return { query: { page } };
};

const where = (collection: CollectionQueryBuilder<ArticlesCollectionItem>) => {
  if (!params.categorie) return collection;
  return collection.where(
    "category",
    "=",
    upperFirst(params.categorie as string)
  );
};

const { data: total, refresh: refreshTotal } = await useAsyncData(
  `articles--${kebabCase(path)}--total`,
  () => {
    const articles = queryCollection("articles");
    where(articles);
    return articles.count();
  }
);

const { data: articles, refresh } = await useAsyncData(
  `articles--${kebabCase(path)}`,
  () => {
    const articles = queryCollection("articles");
    where(articles);
    return articles.limit(itemsPerPage).skip(skip.value).all();
  }
);

watch(page, () => {
  refreshTotal();
  refresh();
});
</script>

<template>
  <UBlogPosts v-if="articles && articles.length > 0">
    <UBlogPost
      v-for="article in articles"
      :key="article.id"
      :title="article.title"
      :description="article.description"
      :to="article.path"
      :image="article.featured_image"
      :date="article.published_time"
      :badge="article.category"
    />
  </UBlogPosts>

  <p v-else>Geen artikelen gevonden</p>

  <UPagination
    v-if="articles && articles.length > 0"
    v-model:page="page"
    :total
    :items-per-page
    :to
    :ui="{ list: 'justify-center' }"
  />
</template>
