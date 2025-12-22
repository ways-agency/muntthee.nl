<script lang="ts" setup>
import type {
  ArticlesCollectionItem,
  CollectionQueryBuilder,
} from "@nuxt/content";
import { kebabCase, upperFirst } from "es-toolkit/string";

const route = useRoute();

const page = ref(route.query.page ? parseInt(route.query.page as string) : 1);
const itemsPerPage = 2;
const skip = computed(() => (page.value - 1) * itemsPerPage);

const to = (page: number) => ({ query: { page } });

const where = (collection: CollectionQueryBuilder<ArticlesCollectionItem>) => {
  if (!route.query.categorie) return collection;
  return collection.where(
    "category",
    "=",
    upperFirst(route.query.categorie as string),
  );
};

const { data: total } = await useAsyncData(
  `articles--${kebabCase(route.path)}--total`,
  () => {
    const articles = queryCollection("articles");
    where(articles);
    return articles.count();
  },
  {
    watch: [() => route.query.categorie],
  },
);

const { data: articles } = await useAsyncData(
  `articles--${kebabCase(route.path)}`,
  () => {
    const articles = queryCollection("articles");
    where(articles);
    return articles.limit(itemsPerPage).skip(skip.value).all();
  },
  {
    watch: [() => route.query.categorie],
  },
);
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
