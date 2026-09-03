import { useMemo, useState } from 'react';

import { hasPrices, priceBounds, products } from '@/data/products';

// The two price sorts only appear once the catalogue actually has prices.
export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  ...(hasPrices
    ? [
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
      ]
    : []),
  { value: 'name', label: 'Name: A – Z' },
];

export const defaultFilters = {
  search: '',
  category: 'All',
  price: [priceBounds.min, priceBounds.max],
  sort: 'featured',
};

/** Products without a listed price sort last, never as zero. */
const priceOf = (p) => (typeof p.price === 'number' ? p.price : Number.POSITIVE_INFINITY);

/**
 * All catalogue filtering, searching and sorting.
 * Pure client-side state — no network, no backend.
 */
export function useProductFilters(initial = {}) {
  const [filters, setFilters] = useState({ ...defaultFilters, ...initial });

  const setFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }));
  const reset = () => setFilters(defaultFilters);

  const results = useMemo(() => {
    const term = filters.search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      if (term) {
        const haystack = [
          product.name,
          product.category,
          product.collection,
          product.productCode,
          product.material,
          product.shortDescription,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(term)) return false;
      }

      if (filters.category !== 'All' && product.category !== filters.category) return false;

      // Unpriced pieces stay visible unless the max has been pulled down.
      const [min, max] = filters.price;
      if (typeof product.price === 'number') {
        if (product.price < min || product.price > max) return false;
      } else if (max < priceBounds.max) {
        return false;
      }

      return true;
    });

    const sorted = [...filtered];
    switch (filters.sort) {
      case 'newest':
        sorted.sort((a, b) => b.year - a.year || Number(b.newArrival) - Number(a.newArrival));
        break;
      case 'price-asc':
        sorted.sort((a, b) => priceOf(a) - priceOf(b));
        break;
      case 'price-desc':
        sorted.sort((a, b) => priceOf(b) - priceOf(a));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort(
          (a, b) => Number(b.featured) - Number(a.featured) || Number(b.newArrival) - Number(a.newArrival)
        );
    }

    return sorted;
  }, [filters]);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count += 1;
    if (filters.category !== 'All') count += 1;
    if (filters.price[0] !== priceBounds.min || filters.price[1] !== priceBounds.max) count += 1;
    return count;
  }, [filters]);

  return { filters, setFilter, setFilters, reset, results, activeCount };
}
