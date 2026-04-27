import Medusa from "@medusajs/medusa-js";

const MEDUSA_BACKEND_URL = "http://62.171.181.241:9000";
const PUBLISHABLE_KEY =
  "pk_dc1824662c3758e57a738ee1954bb10461702e002e0bb723a41075b6c494a6cc";

export const medusaClient = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 2,
  publishableApiKey: PUBLISHABLE_KEY,
});

export const MEDUSA_API = {
  products: {
    list: (params?: Record<string, unknown>) =>
      medusaClient.products.list(params),
    retrieve: (id: string) => medusaClient.products.retrieve(id),
  },
  collections: {
    list: () => medusaClient.collections.list(),
  },
  carts: {
    create: () => medusaClient.carts.create(),
    retrieve: (id: string) => medusaClient.carts.retrieve(id),
    update: (id: string, data: Record<string, unknown>) =>
      medusaClient.carts.update(id, data),
    createLineItem: (
      id: string,
      data: { variant_id: string; quantity: number }
    ) => medusaClient.carts.lineItems.create(id, data),
    updateLineItem: (
      id: string,
      lineItemId: string,
      data: { quantity: number }
    ) => medusaClient.carts.lineItems.update(id, lineItemId, data),
    deleteLineItem: (id: string, lineItemId: string) =>
      medusaClient.carts.lineItems.delete(id, lineItemId),
  },
};
