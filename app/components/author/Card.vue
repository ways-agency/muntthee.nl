<script lang="ts" setup>
defineProps<{
  name: string;
  description: string;
  avatar: object;
}>();
</script>

<template>
  <UPageCard class="m-px">
    <UUser
      :name
      :description
      :avatar
      orientation="vertical"
      size="2xl"
      :ui="{
        root: 'items-center text-center',
        description: 'text-sm',
      }"
    />
  </UPageCard>
</template>
