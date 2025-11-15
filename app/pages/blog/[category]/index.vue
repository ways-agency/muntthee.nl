<script lang="ts" setup>
const route = useRoute();
const { data: page } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection("categories").path(route.path).first()
);

const { data: categories } = await useAsyncData("blog-categories", () =>
  queryCollection("categories").all()
);

const { data: articles } = await useAsyncData(
  `blog-${route.path}-articles`,
  () =>
    queryCollection("articles").where("path", "LIKE", `${route.path}%`).all()
);
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="page?.header.title"
        :description="page?.header.description"
      >
        <template #headline>
          <UButton
            to="/blog"
            icon="i-lucide-arrow-left"
            label="Back to blog"
            variant="link"
            class="p-0"
          />
        </template>

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
            :color="item.path === route.path ? 'primary' : 'neutral'"
            :variant="item.path === route.path ? 'solid' : 'outline'"
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
          />
        </UBlogPosts>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
