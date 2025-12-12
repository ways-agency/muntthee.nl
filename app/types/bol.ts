// Type definitions for the bol.com product object returned by our `/api/bol/[ean]` endpoint
// Keep this aligned with fields used in UI components like `BolCard.vue`.

export interface BolGp {
  level: string;
  name: string;
}

export interface BolImage {
  width: number;
  height: number;
  url: string;
  mimeType: string;
}

export interface BolOffer {
  price: number;
  deliveryDescription: string;
  strikeThroughPrice?: number;
}

export interface BolProduct {
  ean: string;
  bolProductId: string;
  url: string;
  gpc: BolGp[];
  title: string;
  description: string; // Often HTML from bol.com
  image: BolImage;
  rating: number;
  offer?: BolOffer;
  // Added on the server after fetching from bol.com
  partnerUrl: string;
}
