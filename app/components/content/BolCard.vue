<script lang="ts" setup>
defineProps<{
  title: string;
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
        description: 'text-[#e91607] font-bold text-lg',
      }"
    >
      <NuxtPicture
        :src="image"
        :alt="title"
        :img-attrs="{
          width: '550',
          height: '350',
          class: 'rounded-lg p-4 bg-white',
        }"
      />

      <template #description>20,<small>69</small></template>

      <template #footer>
        <UButton label="Koop op bol.com" class="bg-[#0000a4]" />
      </template>
    </UPageCard>
  </ProseCard>
</template>
