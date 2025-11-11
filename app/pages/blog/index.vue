<script lang="ts" setup>
const { data: page } = await useAsyncData("blog", () =>
  queryCollection("blog").first()
);

const { data: categories } = await useAsyncData("blog-categories", () =>
  queryCollection("categories").all()
);

const { data: articles } = await useAsyncData("blog-articles", () =>
  queryCollection("articles").all()
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
          <UPageCard
            :to="item.path"
            class="m-px"
            :ui="{
              container: 'p-2 sm:p-2',
            }"
          >
            {{ item.header.title }}
          </UPageCard>
        </UCarousel>
      </UPageHeader>

      <UPageBody>
        <UPageGrid>
          <ArticleCard
            v-for="article in articles"
            :key="article.id"
            :article="article"
          />
        </UPageGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
