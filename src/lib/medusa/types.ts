export type MedusaProduct = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  thumbnail?: string;
  images?: { url: string }[];
  options?: {
    title: string;
    values: { value: string }[];
  }[];
  variants?: {
    id: string;
    title: string;
    prices?: {
      amount: number;
      currency_code: string;
    }[];
  }[];
  collection_id?: string;
  collection?: { title: string };
  tags?: { value: string }[];
};
