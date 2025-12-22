<script lang="ts" setup>
const { categories } = useBlog();

const items = computed(() =>
  categories.value?.map(({ title, to, count, active }) => ({
    title,
    to,
    count,
    active,
  })),
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
      :color="item.active ? 'primary' : 'neutral'"
      :variant="item.active ? 'solid' : 'outline'"
    >
      {{ item.title }}
      <small :class="item.active ? 'text-primary-100' : 'text-muted'"
        >({{ item.count }})</small
      >
    </UButton>
  </UCarousel>
</template>
