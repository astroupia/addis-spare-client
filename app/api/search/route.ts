import { type NextRequest, NextResponse } from "next/server";
import type { SearchResponse, HighlightedText, SearchResult } from "@/types/search";
import type { Product } from "@/types/product";
import productsDataRaw from "@/mock/search.json";

console.log("Raw JSON import:", productsDataRaw);
interface productsDataRaw {
  results: Product[];
}
const all_products = productsDataRaw.results.map(item => {
  const raw = item.product;
  return {
    id: String(raw.id),
    name: raw.name,
    description: raw.description,
    category: "Uncategorized",
    image_url: raw.image ?? "",
    price: raw.price,
  };
});

console.log("All products loaded:", all_products.length);

export async function GET(request: NextRequest) {
  const search_params = request.nextUrl.searchParams;
  const query = search_params.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json({ results: [], total: 0, product: {} as Product } as SearchResponse);
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const search_terms = query.toLowerCase().split(/\s+/).filter(Boolean);

    const results = all_products
      .filter((product) => {
        const name_match = search_terms.some((term) =>
          product.name.toLowerCase().includes(term)
        );

        const description_match = product.description
          ? search_terms.some((term) =>
              product.description!.toLowerCase().includes(term)
            )
          : false;

        const category_match = search_terms.some((term) =>
          product.category.toLowerCase().includes(term)
        );

        return name_match || description_match || category_match;
      })
      .map((product) => {
        const highlightedName = highlightText(product.name, search_terms);
        const highlightedDescription = product.description
          ? highlightText(product.description, search_terms)
          : undefined;

        return {
          product,
          highlightedName,
          highlightedDescription,
        };
      });


    const newProduct : Product = {
      id: "",
      name: "",
      price: 0,
      category: "",
      image_url: "",
      stock_count: 0,
      sku: "",
      created_at: "",
      updated_at: ""
    };
    const sr : SearchResult[] = [];
    const response: SearchResponse = {
      results: sr,
      total: results.length,
      product: newProduct,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}

function highlightText(text: string, terms: string[]): HighlightedText[] {
  if (!terms.length) return [{ text, highlighted: false }];

  const pattern = new RegExp(`(${terms.join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part) => {
    const is_highlighted = terms.some(
      (term) => part.toLowerCase() === term.toLowerCase()
    );

    return {
      text: part,
      highlighted: is_highlighted,
    };
  });
}
