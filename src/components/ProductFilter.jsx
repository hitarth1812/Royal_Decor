import { SlidersHorizontal, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { sortOptions } from '@/hooks/useProductFilters';
import { categoryNames, hasPrices, priceBounds } from '@/data/products';
import { formatPrice } from '@/config/siteConfig';

function FilterSelect({ label, value, onChange, options, allLabel = 'All' }) {
  return (
    <div className="space-y-2.5">
      <Label className="text-[0.625rem] uppercase tracking-label text-muted-foreground">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12 rounded-full border-navy/12 bg-white px-5 text-sm text-navy shadow-none focus:ring-crimson/50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-navy/10">
          <SelectItem value="All" className="rounded-lg text-sm">
            {allLabel}
          </SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option} className="rounded-lg text-sm">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/** The filter controls themselves — shared by the desktop rail and the mobile sheet. */
function FilterFields({ filters, setFilter }) {
  return (
    <div className="space-y-7">
      <FilterSelect
        label="Category"
        value={filters.category}
        onChange={(v) => setFilter('category', v)}
        options={categoryNames}
        allLabel="All categories"
      />

      {/* Hidden while every piece is quoted on enquiry — the moment a
          product in products.js gets a price, this appears. */}
      <div className={cn('space-y-4', !hasPrices && 'hidden')}>
        <div className="flex items-baseline justify-between">
          <Label className="text-[0.625rem] uppercase tracking-label text-muted-foreground">
            Price range
          </Label>
          <span className="font-display text-xs font-medium text-navy">
            {formatPrice(filters.price[0])} — {formatPrice(filters.price[1])}
          </span>
        </div>

        <Slider
          value={filters.price}
          min={priceBounds.min}
          max={priceBounds.max}
          step={1000}
          minStepsBetweenThumbs={1}
          onValueChange={(v) => setFilter('price', v)}
          thumbLabels={['Minimum price', 'Maximum price']}
          className="py-2"
        />
      </div>
    </div>
  );
}

/** Desktop: a sticky filter rail beside the grid. */
export function ProductFilterRail({ filters, setFilter, reset, activeCount, resultCount, className }) {
  return (
    <aside className={cn('hidden lg:block', className)}>
        <div className="sticky top-28 rounded-panel border border-navy/10 bg-ivory-warm p-7">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold uppercase tracking-label text-navy">
              Filters
            </h2>
            {activeCount > 0 ? (
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-1 text-xs text-crimson transition-opacity duration-300 hover:opacity-70"
              >
                Clear
                <X className="size-3" />
              </button>
            ) : null}
          </div>

          <div className="mt-7">
            <FilterFields filters={filters} setFilter={setFilter} />
          </div>

          <p className="mt-8 border-t border-navy/10 pt-5 text-xs text-muted-foreground">
            Showing <span className="font-medium text-navy">{resultCount}</span> of the
            catalogue
          </p>
      </div>
    </aside>
  );
}

/** Mobile and tablet: the same controls inside a bottom sheet. */
export function ProductFilterSheet({ filters, setFilter, reset, activeCount, resultCount, className }) {
  return (
    <div className={cn('lg:hidden', className)}>
      <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="default" className="w-full sm:w-auto">
              <SlidersHorizontal />
              Filters
              {activeCount > 0 ? (
                <Badge variant="accent" className="ml-1 px-2 py-0.5">
                  {activeCount}
                </Badge>
              ) : null}
            </Button>
          </SheetTrigger>

          <SheetContent side="bottom" className="max-h-[88vh] overflow-y-auto rounded-t-panel border-navy/10 bg-ivory">
            <SheetHeader className="text-left">
              <SheetTitle className="font-display text-lg font-medium tracking-editorial text-navy">
                Filter the collection
              </SheetTitle>
            </SheetHeader>

            <div className="mt-7 pb-4">
              <FilterFields filters={filters} setFilter={setFilter} />
            </div>

            <div className="sticky bottom-0 -mx-6 flex gap-3 border-t border-navy/10 bg-ivory px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Button variant="outline" className="flex-1" onClick={reset}>
                Reset
              </Button>
              <SheetClose asChild>
                <Button className="flex-1">Show {resultCount} results</Button>
              </SheetClose>
            </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

/** The sort control — kept beside the results count on every breakpoint. */
export function ProductSort({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-[0.625rem] uppercase tracking-label text-muted-foreground sm:block">
        Sort
      </span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          aria-label="Sort products"
          className="h-12 w-full min-w-[11rem] rounded-full border-navy/12 bg-white px-5 text-sm text-navy shadow-none focus:ring-crimson/50 sm:w-auto"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-navy/10">
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} className="rounded-lg text-sm">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
