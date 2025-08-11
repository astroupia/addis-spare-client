// mock/mock-data.tsx

import type { ProductMessage } from "@/types/message"

export function getMockProducts(): ProductMessage[] {
  return [
    {
      id: "p1",
      title: "Toyota Corolla Brake Pads",
      description: "Genuine front brake pads for Toyota Corolla (2010–2015).",
      price: "ETB 3,200",
      image: "/images/products/brake-pads.jpg",
      postedAt: "2025-07-12T10:30:00Z",
      seller: {
        id: "s1",
        name: "Mekdes Auto Parts",
        email: "mekdes@autoparts.et",
        phone: "+251911223344",
        avatar_url: "/images/sellers/mekdes.jpg",
        business_name: "Mekdes Auto Parts",
        rating: {
          average: 4.7,
          count: 128, // mock count
        },
        response_time: "Usually responds within 1 hour",
        verified: true,
        created_at: "2024-03-01T09:00:00Z",
      },
    },
    {
      id: "p2",
      title: "Hyundai Accent Side Mirror",
      description: "Brand new manual side mirror for Hyundai Accent 2017+.",
      price: "ETB 1,400",
      image: "/images/products/side-mirror.jpg",
      postedAt: "2025-07-13T15:45:00Z",
      seller: {
        id: "s2",
        name: "Tikur Parts Center",
        email: "contact@tikurparts.et",
        phone: "+251922556677",
        avatar_url: "/images/sellers/tikur.jpg",
        business_name: "Tikur Parts Center",
        rating: {
          average: 4.2,
          count: 64,
        },
        response_time: "Usually responds within 3 hours",
        verified: false,
        created_at: "2023-11-18T14:30:00Z",
      },
    },
    {
      id: "p3",
      title: "Isuzu NPR Oil Filter",
      description: "Heavy-duty oil filter compatible with Isuzu NPR trucks.",
      price: "ETB 800",
      image: "/images/products/oil-filter.jpg",
      postedAt: "2025-07-10T08:00:00Z",
      seller: {
        id: "s3",
        name: "Selam Trucks Hub",
        email: "info@selamtrucks.et",
        phone: "+251933889900",
        avatar_url: "/images/sellers/selam.jpg",
        business_name: "Selam Trucks Hub",
        rating: {
          average: 4.9,
          count: 212,
        },
        response_time: "Usually responds within 30 minutes",
        verified: true,
        created_at: "2022-09-05T12:00:00Z",
      },
    },
  ]
}
