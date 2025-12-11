<script lang="ts" setup>
import type { BolProduct } from "../types/bol";

const props = defineProps<{
  ean: string;
}>();

const { data: product } = useFetch<BolProduct>(`/api/bol/${props.ean}`, {
  server: false,
});
</script>

<template>
  <ClientOnly>
    <ProseCard class="rounded-none border-none p-0 sm:p-0">
      <UPageCard
        :title="product?.title"
        :to="product?.partnerUrl"
        target="_blank"
        orientation="horizontal"
        variant="subtle"
        reverse
        :ui="{
          container: 'md:grid grid-cols-4 lg:grid-cols-4',
          wrapper: 'col-span-3 md:order-last lg:col-span-3',
        }"
      >
        <NuxtPicture
          :src="product?.image.url"
          :alt="product?.title"
          :img-attrs="{
            width: '250',
            height: '200',
            class: 'rounded-lg p-4 bg-white',
          }"
        />

        <template v-if="product?.offer" #description>
          <span class="text-lg font-bold text-[#e91607]">
            {{ product?.offer?.price }}
          </span>
          <template v-if="product?.offer?.strikeThroughPrice">
            ,
            <s>{{ product?.offer?.strikeThroughPrice }}</s>
          </template>

          <p>{{ product?.offer?.deliveryDescription }}</p>
        </template>

        <template #footer>
          <div class="flex flex-wrap items-center gap-2">
            <UBadge label="Controleer prijs" class="bg-[#0000a4]" size="lg" />
            <span>Bol</span>
          </div>
        </template>
      </UPageCard>
    </ProseCard>
  </ClientOnly>
</template>
