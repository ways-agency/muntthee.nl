<script setup lang="ts">
const { data: page } = await useAsyncData("index", () =>
  queryCollection("index").first()
);

const categories = ref([
  {
    title: "Recepten",
    description: "Verschillende muntthee recepten voor ieder moment en smaak.",
    icon: "i-lucide-book-open",
    to: "/recepten",
  },
  {
    title: "Gezondheid",
    description:
      "Lees over de gezondheidsvoordelen en voedingswaarde van muntthee.",
    icon: "i-lucide-heart-pulse",
    to: "/gezondheid",
  },
  {
    title: "Oorsprong",
    description: "Ontdek de geschiedenis en oorsprong van muntthee wereldwijd.",
    icon: "i-lucide-globe",
    to: "/oorsprong",
  },
]);
</script>

<template>
  <UPage>
    <UPageBody>
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
          src="/images/muntthee-nl-hero.jpg"
          alt="Muntthee.nl hero"
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
    </UPageBody>
  </UPage>
</template>
