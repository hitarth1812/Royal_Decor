import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Seo } from '@/components/Seo';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductCard } from '@/components/ProductCard';
import { EnquiryForm } from '@/components/EnquiryForm';
import { Reveal } from '@/components/Reveal';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { formatPrice, productWhatsappLink, siteConfig, telLink } from '@/config/siteConfig';
import { img } from '@/config/images';

function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 text-section font-light text-navy">We could not find that piece.</h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
        It may have sold, or the link may be out of date. The full collection is
        always up to date on the products page.
      </p>
      <Button asChild className="mt-9">
        <Link to="/products">
          <ArrowLeft />
          Back to all products
        </Link>
      </Button>
    </div>
  );
}

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!product) return <NotFound />;

  const related = getRelatedProducts(product);

  const specs = [
    { label: 'Product code', value: product.productCode },
    { label: 'Collection', value: `${product.collection} Collection` },
    { label: 'Category', value: product.category },
    { label: 'Materials', value: product.material },
    { label: 'Dimensions', value: product.dimensions },
    { label: 'Finishes', value: product.colors.join(', ') },
    { label: 'Availability', value: product.availability },
    { label: 'Introduced', value: product.year },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((i) => img(i, 1200)),
    description: product.description,
    sku: product.productCode,
    brand: { '@type': 'Brand', name: siteConfig.SHOWROOM_NAME },
    material: product.material,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price ?? undefined,
      availability:
        product.availability === 'In Stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      seller: { '@type': 'Organization', name: siteConfig.SHOWROOM_NAME },
    },
  };

  return (
    <>
      <Seo
        title={product.name}
        description={`${product.shortDescription} ${product.material}. ${product.dimensions}. Available at ${siteConfig.SHOWROOM_NAME}.`}
        image={img(product.images[0], 1200)}
        structuredData={structuredData}
      />

      <div className="pt-28 md:pt-36">
        <div className="shell">
          {/* ---- Breadcrumb ---- */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-label uppercase tracking-label text-muted-foreground">
              <li>
                <Link to="/" className="transition-colors duration-300 hover:text-crimson">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/products" className="transition-colors duration-300 hover:text-crimson">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to={`/products?category=${encodeURIComponent(product.category)}`}
                  className="transition-colors duration-300 hover:text-crimson"
                >
                  {product.category}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-navy">{product.name}</li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            {/* ---------------- Gallery ---------------- */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ProductGallery images={product.images} alt={product.name} />
            </div>

            {/* ---------------- Details ---------------- */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {product.newArrival ? <Badge variant="accent">New arrival</Badge> : null}
                <Badge variant="outline">{product.category}</Badge>
                <Badge variant="muted">{product.collection} Collection</Badge>
              </div>

              <h1 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] tracking-editorial text-navy">
                {product.name}
              </h1>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* ---- Price block ---- */}
              <div className="mt-9 flex flex-wrap items-end gap-x-8 gap-y-4 border-y border-navy/10 py-7">
                <div>
                  <p className="label-xs uppercase tracking-label text-muted-foreground">
                    {product.price == null ? 'Pricing' : 'Showroom price'}
                  </p>
                  <p
                    className={cn(
                      'mt-2 font-display text-3xl font-medium tracking-tightest text-navy',
                      product.price == null && 'text-crimson'
                    )}
                  >
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div>
                  <p className="label-xs uppercase tracking-label text-muted-foreground">
                    Availability
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-navy">
                    <span
                      className={cn(
                        'size-1.5 rounded-full',
                        product.availability === 'In Stock' ? 'bg-emerald-600' : 'bg-crimson'
                      )}
                      aria-hidden="true"
                    />
                    {product.availability}
                  </p>
                </div>

                <div>
                  <p className="label-xs uppercase tracking-label text-muted-foreground">
                    Code
                  </p>
                  <p className="mt-2 text-sm text-navy">{product.productCode}</p>
                </div>
              </div>

              {/* ---- Finishes ---- */}
              <div className="mt-8">
                <p className="label-xs uppercase tracking-label text-muted-foreground">
                  Available finishes
                </p>
                <ul className="mt-3.5 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <li
                      key={color}
                      className="rounded-full border border-navy/12 px-4 py-2 text-xs text-navy"
                    >
                      {color}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ---- Actions ---- */}
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="sm:col-span-2">
                      <Send />
                      Enquire Now
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-panel border-navy/10 bg-ivory">
                    <DialogHeader>
                      <DialogTitle className="font-display text-2xl font-light tracking-editorial text-navy">
                        Enquire about {product.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <EnquiryForm
                        defaultProduct={`${product.name} (${product.productCode})`}
                        compact
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                <Button asChild variant="whatsapp" size="lg">
                  <a href={productWhatsappLink(product)} target="_blank" rel="noreferrer">
                    <MessageCircle />
                    WhatsApp
                  </a>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <a href={telLink}>
                    <Phone />
                    Call Showroom
                  </a>
                </Button>
              </div>

              <a
                href={siteConfig.GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="group mt-5 flex items-center gap-2.5 text-xs text-muted-foreground transition-colors duration-300 hover:text-navy"
              >
                <MapPin className="size-3.5 text-crimson" strokeWidth={1.5} />
                See it on the floor — {siteConfig.ADDRESS_LINE_1}
                <ArrowUpRight className="size-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* ---- Specifications ---- */}
              <Accordion type="single" collapsible defaultValue="specs" className="mt-10">
                <AccordionItem value="specs" className="border-navy/10">
                  <AccordionTrigger className="font-display text-sm font-semibold uppercase tracking-label text-navy hover:no-underline">
                    Specifications
                  </AccordionTrigger>
                  <AccordionContent>
                    <dl className="divide-y divide-navy/8">
                      {specs.map((spec) => (
                        <div key={spec.label} className="flex gap-6 py-3.5">
                          <dt className="w-32 shrink-0 label-xs uppercase tracking-label text-muted-foreground">
                            {spec.label}
                          </dt>
                          <dd className="text-sm text-navy">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="delivery" className="border-navy/10">
                  <AccordionTrigger className="font-display text-sm font-semibold uppercase tracking-label text-navy hover:no-underline">
                    Delivery &amp; care
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <p className="flex gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-crimson" />
                      White-glove delivery and in-room installation across the region.
                    </p>
                    <p className="flex gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-crimson" />
                      In-stock pieces dispatch within 5–7 working days; made-to-order
                      pieces take 6–10 weeks depending on finish.
                    </p>
                    <p className="flex gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-crimson" />
                      Two-year service promise, with reupholstery and refinishing
                      available long after.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Related ---------------- */}
      {related.length > 0 ? (
        <section className="section">
          <div className="shell">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-section font-light text-navy">You may also like</h2>
              <Button asChild variant="outline" className="hidden sm:inline-flex">
                <Link to="/products">
                  All products
                  <ArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-6">
              {related.map((item, i) => (
                <Reveal key={item.id} delay={i * 80} className="h-full">
                  <ProductCard product={item} className="h-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
