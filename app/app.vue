<script lang="ts" setup>
import { nl } from "@nuxt/ui/locale";
</script>

<template>
  <UApp :locale="nl">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain as="main">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
  </UApp>
</template>
