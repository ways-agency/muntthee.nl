<script setup lang="ts">
const { data: page } = await useAsyncData("over-ons", () =>
  queryCollection("about_us").first()
);

const { data: author } = await useAsyncData("author", () =>
  queryCollection("auteurs").first()
);
</script>

<template>
  <UPage>
    <UPageSection
      :title="page?.about_us.title"
      :description="page?.about_us.description"
      orientation="horizontal"
    >
      <NuxtPicture
        :src="page?.about_us.image?.src"
        :alt="page?.about_us.image?.alt"
        :img-attrs="{
          width: '975',
          height: '677.55',
          class: 'w-full rounded-lg',
        }"
      />
    </UPageSection>

    <UPageSection :title="author?.name">
      <template #leading>
        <NuxtPicture
          :src="author?.avatar?.src"
          :alt="author?.avatar?.alt"
          :img-attrs="{
            width: '120',
            height: '120',
            class: 'rounded-full',
          }"
        />
      </template>

      <template #description>
        <div class="prose max-w-full" v-html="author?.bio" />
      </template>
    </UPageSection>
  </UPage>
</template>
