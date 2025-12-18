<script lang="ts" setup>
import type { BolProduct } from "@/types/bol";

const props = defineProps<{
  ean: string;
}>();

const { data: product, pending } = useFetch<BolProduct>(
  `/api/bol/${props.ean}`,
  {
    server: false,
  },
);

const ratingWidth = computed(() => {
  return `${(product?.value?.rating ?? 0) * 20}%`;
});

const price = computed(() => {
  if (!product?.value?.offer?.price) return null;
  return Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(product.value.offer.price);
});

const strikeThroughPrice = computed(() => {
  if (!product?.value?.offer?.strikeThroughPrice) return null;
  return Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(product.value.offer.strikeThroughPrice);
});
</script>

<template>
  <!-- <ProseCard class="flex items-center gap-4">
    <USkeleton class="h-12 w-12 rounded-full" />

    <div class="grid gap-2">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
  </ProseCard> -->

  <ProseCard :to="product?.partnerUrl">
    <div class="flex items-center gap-4">
      <USkeleton
        v-if="pending"
        class="aspect-square size-full max-w-[100px] rounded-lg"
      />

      <NuxtPicture
        v-if="product"
        :src="product?.image.url"
        :alt="product?.title"
        :img-attrs="{
          width: product?.image?.width,
          height: product?.image?.height,
          class: 'max-w-[100px] max-h-[100px] rounded-lg bg-white p-2',
        }"
      />

      <div
        class="flex flex-1 flex-col items-start gap-4 sm:flex-row sm:items-center"
      >
        <div class="flex-1 space-y-2">
          <h3 class="line-clamp-2 text-lg font-bold">
            <USkeleton v-if="pending">
              <span class="invisible">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </span>
            </USkeleton>
            {{ product?.title }}
          </h3>

          <p>
            <USkeleton v-if="pending">
              <span class="invisible">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </span>
            </USkeleton>
            {{ product?.offer?.deliveryDescription }}
          </p>

          <div
            v-if="product?.rating && product?.rating > 3"
            class="flex items-center gap-2"
          >
            <div class="pointer-events-none relative">
              <div class="flex flex-row">
                <UIcon
                  v-for="index in 5"
                  :key="index"
                  name="i-fa-solid-star"
                  class="shrink-0 text-neutral-300"
                  :class="{ 'animate-pulse': !pending }"
                />
              </div>

              <div v-if="product" class="absolute top-0 left-0 h-full">
                <div
                  class="flex flex-row overflow-hidden"
                  :style="{ maxWidth: ratingWidth }"
                >
                  <UIcon
                    v-for="index in 5"
                    :key="index"
                    name="i-fa-solid-star"
                    class="shrink-0 text-[#feb601]"
                  />
                </div>
              </div>
            </div>

            <span>{{ product?.rating ?? 0 }} / 5</span>
          </div>
        </div>

        <div class="flex flex-col gap-2 sm:items-center">
          <div class="flex flex-wrap items-center gap-x-2 sm:justify-center">
            <s v-if="strikeThroughPrice">
              {{ strikeThroughPrice }}
            </s>
            <span class="text-lg font-bold text-[#e91607]">
              <USkeleton v-if="pending">
                <span class="invisible">€ 0,00</span>
              </USkeleton>
              {{ price }}
            </span>
          </div>

          <UBadge label="Koop bij bol" size="lg" />
        </div>
      </div>
    </div>
  </ProseCard>
</template>
