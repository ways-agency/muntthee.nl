<script lang="ts" setup>
const route = useRoute();
const page = ref(route.query.page ? Number(route.query.page) : 1);
const itemsPerPage = 2;
const skip = computed(() => (page.value - 1) * itemsPerPage);

function to(page: number) {
  return { query: { page } };
}

const { data: total } = await useAsyncData(
  `blog-articles-total-${route.path}`,
  () =>
    queryCollection("articles").where("path", "LIKE", `${route.path}%`).all(),
  { transform: (data) => data.length }
);

const { data: articles } = await useAsyncData(
  `blog-articles-${route.path}`,
  () =>
    queryCollection("articles")
      .where("path", "LIKE", `${route.path}%`)
      .limit(itemsPerPage)
      .skip(skip.value)
      .all(),
  { watch: [page] }
);
</script>

<template>
  <br />
  <UBlogPosts>
    <UBlogPost
      v-for="article in articles"
      :key="article.id"
      :title="article.title"
      :description="article.description"
      :to="article.path"
      :image="article.featured_image"
      :date="article.published_time"
    />
  </UBlogPosts>

  <UPagination
    v-model:page="page"
    :total
    :items-per-page
    :to
    :ui="{ list: 'justify-center' }"
  />
</template>
