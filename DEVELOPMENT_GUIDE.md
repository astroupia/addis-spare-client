# Addis Spare Part - Frontend Development Guide

## Project Structure Overview

```
addis-spare-client/
├── app/                    # Next.js 13+ App Router
│   ├── (auth)/            # Authentication related pages
│   ├── (root)/            # Main application pages
│   │   └── product/       # Product related pages
│   │       └── [id]/      # Dynamic product detail pages
│   └── layout.tsx         # Root layout component
├── components/            # Reusable components
│   ├── auth/             # Authentication related components
│   ├── products/         # Product related components
│   ├── shared/           # Shared/common components
│   └── ui/               # UI components (buttons, inputs, etc.)
├── types/                # TypeScript type definitions
│   ├── auth.ts           # Authentication related types
│   ├── product.ts        # Product related types
│   └── user.ts           # User related types
└── mock/                 # Mock data for development
    ├── products.json     # Mock product data
    └── user.json         # Mock user data
```

## Development Guidelines

### 1. TypeScript Best Practices

#### Component Types

Always define interfaces for your component props:

```typescript
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  onAddToCart: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  description,
  onAddToCart,
}) => {
  // Component implementation
};
```

#### API Response Types

Define interfaces for API responses:

```typescript
interface ProductResponse {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  specifications: Record<string, string>;
}
```

### 2. Component Organization

#### Component Structure

Each component should follow this structure:

```
components/
└── products/
    ├── ProductCard/
    │   ├── index.tsx
    │   ├── ProductCard.tsx
    │   ├── ProductCard.types.ts
    │   ├── ProductCard.styles.ts
    │   └── ProductCard.test.tsx
```

#### Component Example

```typescript
// ProductCard.types.ts
export interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

// ProductCard.tsx
import { ProductCardProps } from "./ProductCard.types";
import styles from "./ProductCard.styles";

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  // Implementation
};
```

### 3. Working with Pages

#### Main Page Development

1. Create page components in `app/(root)/page.tsx`
2. Use components from `components/products/` for product listings
3. Implement data fetching using Next.js data fetching methods
4. Use mock data during development from `mock/products.json`

#### Authentication Pages

1. Work within `app/(auth)/` directory
2. Use components from `components/auth/`
3. Implement authentication logic using types from `types/auth.ts`
4. Test with mock user data from `mock/user.json`

### 4. Modular Development Tips

1. **Component Isolation**

   - Keep components focused on a single responsibility
   - Use composition over inheritance
   - Implement proper prop drilling or context when needed

2. **Type Safety**

   - Always define interfaces for component props
   - Use strict TypeScript configurations
   - Avoid using `any` type
   - Use proper type guards when necessary

3. **State Management**

   - Use React hooks for local state
   - Implement proper state management patterns
   - Keep state as close as possible to where it's used

4. **Styling**
   - Use CSS modules or styled-components
   - Keep styles co-located with components
   - Implement a consistent design system

### 5. Working with Mock Data

1. Use mock data during development:

```typescript
import mockProducts from "@/mock/products.json";
import { Product } from "@/types/product";

// Type assertion for mock data
const products: Product[] = mockProducts as Product[];
```

2. Create mock data handlers:

```typescript
// mock/handlers.ts
export const getMockProducts = (): Product[] => {
  return mockProducts as Product[];
};
```

### 6. Best Practices for New Features

1. **Type First Development**

   - Define types before implementing components
   - Use TypeScript's utility types when appropriate
   - Maintain type consistency across the application

2. **Component Creation Process**

   - Create types first
   - Implement basic component structure
   - Add styling
   - Implement functionality
   - Add tests
   - Document usage

3. **Code Organization**

   - Keep related files together
   - Use proper naming conventions
   - Maintain consistent file structure
   - Document complex logic

4. **Testing**
   - Write unit tests for components
   - Test edge cases
   - Use proper mocking strategies
   - Maintain good test coverage

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Begin development following the guidelines above

Remember to:

- Always use TypeScript for type safety
- Follow the established folder structure
- Use mock data during development
- Write clean, maintainable code
- Document your components and functions
- Write tests for your components
