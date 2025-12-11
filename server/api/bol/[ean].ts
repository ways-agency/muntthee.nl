import type { BolProduct } from "../../../app/components/types/bol";

export default defineEventHandler(async (event) => {
  const accessToken = await getBolAccessToken();
  const ean = getRouterParam(event, "ean");

  const product = await $fetch<BolProduct>(
    `https://api.bol.com/marketing/catalog/v1/products/${ean}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": "nl",
      },
      query: {
        "country-code": "nl",
        "include-image": true,
        "include-offer": true,
        "include-rating": true,
      },
    },
  );

  product.partnerUrl = `https://partner.bol.com/click/click?p=2&t=url&s=1489097&f=TXL&url=${product.url}&name=${encodeURIComponent(product.title)}`;

  return product;
});
