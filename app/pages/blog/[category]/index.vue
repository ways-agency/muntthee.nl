<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection("categories").path(route.path).first()
);

const { data: categories } = await useAsyncData("blog-categories", () =>
  queryCollection("categories").all()
);
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :title="page?.title" :description="page?.description">
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
            :label="item.title"
            :to="item.path"
            :color="item.path === route.path ? 'primary' : 'neutral'"
            :variant="item.path === route.path ? 'solid' : 'outline'"
          />
        </UCarousel>
      </UPageHeader>

      <UPageBody>
        <BlogOverview />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
