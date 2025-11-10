<script setup lang="ts">
const { data: page } = await useAsyncData("index", () =>
  queryCollection("index").first()
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
        :src="page?.hero.backgroundImage?.src"
        :alt="page?.hero.backgroundImage?.alt"
        :img-attrs="{
          class: 'size-full object-cover',
          fetchpriority: 'high',
          loading: 'eager',
        }"
      />
    </UPageHero>

    <UPageSection
      :title="page?.popularCategories.title"
      :description="page?.popularCategories.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(category, index) in page?.popularCategories.cards"
          :key="index"
          v-bind="category"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      :title="page?.aboutUs.title"
      :description="page?.aboutUs.description"
      orientation="horizontal"
      :links="page?.aboutUs.links"
    >
      <NuxtPicture
        class="rounded-lg overflow-hidden"
        :src="page?.aboutUs.image?.src"
        :alt="page?.aboutUs.image?.alt"
      />
    </UPageSection>

    <UPageSection
      :title="page?.latestArticles.title"
      :description="page?.latestArticles.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(category, index) in page?.popularCategories.cards"
          :key="index"
          v-bind="category"
        />
      </UPageGrid>
    </UPageSection>
  </UPage>
</template>
