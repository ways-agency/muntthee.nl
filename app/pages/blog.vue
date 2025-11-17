<script lang="ts" setup>
const { data: page } = await useAsyncData("blog", () =>
  queryCollection("blog").first()
);

const { categories } = useBlog();
const items = computed(() =>
  categories.value?.map(({ title, to }) => ({ title, to }))
);
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :title="page?.title" :description="page?.description">
        <UCarousel
          v-slot="{ item }"
          :items
          class="w-full mt-6"
          :ui="{
            item: 'basis-auto',
          }"
        >
          <UButton
            :label="item.title"
            :to="item.to"
            color="neutral"
            variant="outline"
          />
        </UCarousel>
      </UPageHeader>

      <UPageBody>
        <BlogOverview />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
