import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Seo } from '@/components/Seo';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/SearchBar';
import { ProductFilterRail, ProductFilterSheet, ProductSort } from '@/components/ProductFilter';
import { ProductGrid } from '@/components/ProductGrid';
import { PageHeader } from '@/components/PageHeader';
import { useProductFilters } from '@/hooks/useProductFilters';
import { categoryNames, products } from '@/data/products';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('q');

  const { filters, setFilter, reset, results, activeCount } = useProductFilters({
    category: categoryNames.includes(categoryParam) ? categoryParam : 'All',
    search: searchParam ?? '',
  });

  // Keep the URL shareable: category and search live in the query string.
  useEffect(() => {
    const next = new URLSearchParams();
    if (filters.category !== 'All') next.set('category', filters.category);
    if (filters.search.trim()) next.set('q', filters.search.trim());
    setSearchParams(next, { replace: true });
  }, [filters.category, filters.search, setSearchParams]);

  return (
    <>
      <Seo
        title="Products"
        description={`Browse all ${products.length} pieces in the showroom — search by name and filter by category.`}
      />

      <PageHeader
        eyebrow="The catalogue"
        title="Everything we make and fit."
        subtitle="Search and filter the range, then come in and see the fabrics, finishes and samples in person."
      />

      <section className="pb-24 md:pb-32">
        <div className="shell">
          {/* ---- Search + sort bar ---- */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <SearchBar
              value={filters.search}
              onChange={(v) => setFilter('search', v)}
              className="flex-1"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ProductFilterSheet
                filters={filters}
                setFilter={setFilter}
                reset={reset}
                activeCount={activeCount}
                resultCount={results.length}
              />
              <ProductSort value={filters.sort} onChange={(v) => setFilter('sort', v)} />
            </div>
          </div>

          {/* ---- Active filter chips ---- */}
          {activeCount > 0 ? (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {filters.category !== 'All' ? (
                <Badge variant="soft">{filters.category}</Badge>
              ) : null}
              <button
                type="button"
                onClick={reset}
                className="text-xs text-crimson transition-opacity duration-300 hover:opacity-70"
              >
                Clear all
              </button>
            </div>
          ) : null}

          {/* ---- Results ---- */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
            <ProductFilterRail
              filters={filters}
              setFilter={setFilter}
              reset={reset}
              activeCount={activeCount}
              resultCount={results.length}
            />

            <div>
              <p className="mb-8 text-xs uppercase tracking-label text-muted-foreground">
                {results.length} {results.length === 1 ? 'product' : 'products'}
                {filters.category !== 'All' ? ` in ${filters.category}` : ''}
              </p>

              <ProductGrid products={results} onReset={reset} columns={3} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
