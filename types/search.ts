import { Product } from "./product";

export type HighlightedText = {
  text: string;
  highlighted: boolean;
};

export type SearchResult = {
  product: Product;
  highlightedName: HighlightedText[];
  highlightedDescription?: HighlightedText[];
};

export type SearchResponse = {
  results: SearchResult[];
  total: number;
  product: Product;
};

export type SearchQueryParams = {
  q: string
}