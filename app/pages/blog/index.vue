<script lang="ts" setup>
const currentPage = ref(1);
const limit = 1;

const { data: page } = await useAsyncData("blog", () =>
  queryCollection("blog").first()
);

const { data: categories } = await useAsyncData("blog-categories", () =>
  queryCollection("categories").all()
);

const { data: totalArticles } = await useAsyncData("blog-articles-total", () =>
  queryCollection("articles").all()
);

const { data: articles } = await useAsyncData("blog-articles", () =>
  queryCollection("articles").limit(limit).all()
);
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="page?.header.title"
        :description="page?.header.description"
      >
        <UCarousel
          v-slot="{ item }"
          :items="categories"
          class="w-full mt-6"
          :ui="{
            item: 'basis-auto',
          }"
        >
          <UButton
            :label="item.header.title"
            :to="item.path"
            color="neutral"
            variant="outline"
          />
        </UCarousel>
      </UPageHeader>

      <UPageBody>
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
          v-model:page="currentPage"
          :total="totalArticles.length"
          :items-per-page="limit"
          :ui="{
            list: 'justify-center',
          }"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
