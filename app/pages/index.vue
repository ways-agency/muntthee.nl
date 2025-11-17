<script setup lang="ts">
import type { PageCardProps } from "@nuxt/ui";

const { data: page } = await useAsyncData("index", () =>
  queryCollection("index").first()
);

const { data: categories } = await useAsyncData(
  "categories",
  () => queryCollection("categories").all(),
  {
    transform: (data) => {
      const items: PageCardProps[] = data.slice(0, 5).map((item) => ({
        title: item.title,
        description: item.description,
        icon: item.navigation?.icon,
        to: item.path,
      }));

      items.push({
        title: "Alle categorieën",
        description: "Ontdek alle categorieën van muntthee.nl",
        icon: "i-lucide-list",
        to: "/blog",
      });

      return items;
    },
  }
);
</script>

<template>
  <UPage>
    <UPageHero
      as="section"
      class="isolate relative bg-black"
      :title="page?.hero.title"
      :description="page?.hero.description"
      :links="page?.hero.links"
      :ui="{
        wrapper: 'text-left',
        title: 'text-inverted',
        description: 'text-dimmed max-w-prose',
        links: 'justify-start',
      }"
    >
      <NuxtPicture
        class="absolute -z-10 inset-0 opacity-25"
        :src="page?.hero.background_image?.src"
        :alt="page?.hero.background_image?.alt"
        :img-attrs="{
          class: 'size-full object-cover',
          fetchpriority: 'high',
          loading: 'eager',
        }"
      />
    </UPageHero>

    <UPageSection
      :title="page?.popular_categories.title"
      :description="page?.popular_categories.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(category, index) in categories"
          :key="index"
          v-bind="category"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      :title="page?.about_us.title"
      :description="page?.about_us.description"
      orientation="horizontal"
      :links="page?.about_us.links"
    >
      <NuxtPicture
        class="rounded-lg overflow-hidden"
        :src="page?.about_us.image?.src"
        :alt="page?.about_us.image?.alt"
      />
    </UPageSection>

    <UPageSection
      :title="page?.latest_articles.title"
      :description="page?.latest_articles.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(category, index) in page?.popular_categories.cards"
          :key="index"
          v-bind="category"
        />
      </UPageGrid>
    </UPageSection>
  </UPage>
</template>
