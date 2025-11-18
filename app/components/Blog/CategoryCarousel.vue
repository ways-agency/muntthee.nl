<script lang="ts" setup>
const { path } = useRoute();

const { categories } = useBlog();
const items = computed(() =>
  categories.value?.map(({ title, to, count }) => ({ title, to, count })),
);
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items
    class="mt-6 w-full"
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
</template>
