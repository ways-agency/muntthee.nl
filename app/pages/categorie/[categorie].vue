<script lang="ts" setup>
import { upperFirst } from "es-toolkit/string";

const { path, params } = useRoute();

const { data: page } = await useAsyncData(
  `categorie--${params.categorie}`,
  () => queryCollection("categories").path(path).first()
);

const { data: total } = await useAsyncData(
  `categorie--${params.categorie}--total`,
  () =>
    queryCollection("articles")
      .where("category", "=", upperFirst(params.categorie as string))
      .count()
);

const { categories } = useBlog();
const items = computed(() =>
  categories.value?.map(({ title, to, count }) => ({ title, to, count }))
);

useRobotsRule(total.value && total.value > 0 ? true : false);
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :description="page?.description">
        <template #title>
          {{ page?.title }}
          <small class="text-primary-300 text-base">({{ total }})</small>
        </template>

        <UCarousel
          v-slot="{ item }"
          :items
          class="w-full mt-6"
          :ui="{
            item: 'basis-auto',
          }"
        >
          <UButton
            :to="item.to"
            :color="path === item.to ? 'primary' : 'neutral'"
            :variant="path === item.to ? 'solid' : 'outline'"
          >
            {{ item.title }}
            <small :class="path === item.to ? 'text-primary-100' : 'text-muted'"
              >({{ item.count }})</small
            >
          </UButton>
        </UCarousel>
      </UPageHeader>

      <UPageBody>
        <BlogOverview />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
