import { Search, X } from 'lucide-react';

import { cn } from '@/lib/utils';

export function SearchBar({ value, onChange, className, placeholder = 'Search by name, code or material…' }) {
  return (
    <div className={cn('relative', className)}>
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>

      <Search
        className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-navy/40"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-14 w-full rounded-full border border-navy/12 bg-white pl-12 pr-12 text-sm text-navy shadow-soft outline-none transition-colors duration-300 placeholder:text-navy/35 focus:border-crimson/60 [&::-webkit-search-cancel-button]:appearance-none"
      />

      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-navy/50 transition-colors duration-300 hover:bg-navy/5 hover:text-navy"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  );
}

export default SearchBar;
