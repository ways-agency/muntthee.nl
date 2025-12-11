<script lang="ts" setup>
defineProps<{
  title: string;
  description: string;
  price: number;
  strikeThroughPrice: number;
  rating: number;
  image: string;
  to: string;
}>();
</script>

<template>
  <ProseCard class="rounded-none border-none p-0 sm:p-0">
    <UPageCard
      :title
      :to
      target="_blank"
      orientation="horizontal"
      variant="subtle"
      reverse
      :ui="{
        container: 'lg:grid-cols-3',
        wrapper: 'lg:col-span-2',
      }"
    >
      <NuxtPicture
        :src="image"
        :alt="title"
        :img-attrs="{
          width: '250',
          height: '200',
          class: 'rounded-lg p-4 bg-white',
        }"
      />

      <template #description>
        <span class="text-lg font-bold text-[#e91607]">{{ price }}</span
        >, <s>{{ strikeThroughPrice }}</s>
      </template>

      <template #footer>
        <UButton label="Koop op bol.com" class="bg-[#0000a4]" />
      </template>
    </UPageCard>
  </ProseCard>
</template>
