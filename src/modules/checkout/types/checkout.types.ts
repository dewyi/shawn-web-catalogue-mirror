export interface CheckoutSession {
  sessionId: string;
  url: string;
}

export interface ShippingInfo {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
}

export interface CheckoutItem {
  productId: string;
  name: string;
  price: string;
  quantity: number;
}
