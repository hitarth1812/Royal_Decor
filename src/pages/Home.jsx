import { Seo } from '@/components/Seo';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { CategorySection } from '@/components/CategorySection';
import { FeaturedCollection } from '@/components/FeaturedCollection';
import { StatsSection } from '@/components/StatsSection';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { ShowroomSection } from '@/components/ShowroomSection';
import { BrandsSection } from '@/components/BrandsSection';
import { TestimonialCarousel } from '@/components/Testimonials';
import { InstagramGrid } from '@/components/InstagramGrid';
import { CTASection } from '@/components/CTASection';
import { images, img } from '@/config/images';

export default function Home() {
  return (
    <>
      <Seo
        description="A curated interior and furniture showroom. Explore seating, dining, bedroom, lighting and decor collections, then visit us to experience them in person."
        image={img(images.heroMain, 1200)}
      />

      <Hero />
      <Marquee />
      <CategorySection />
      <FeaturedCollection />
      <StatsSection />
      <ShowroomSection />
      <BrandsSection />
      <WhyChooseUs />
      <TestimonialCarousel />
      <InstagramGrid />
      <CTASection />
    </>
  );
}
