import { AccordionGallery } from '@/components/AccordionGallery';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { images, img } from '@/config/images';
import { categories } from '@/data/products';

/**
 * A hover-expanding panel row, one per category — the same six
 * categories as `CategorySection`, presented as a single wide gallery
 * instead of a grid, so the homepage has one section that lets a
 * photo fill the screen rather than sit in a card.
 */
export function RoomGallery() {
  const items = categories.map((category) => ({
    image: img(images[category.image], 1200),
    label: category.name,
    link: `/products?category=${encodeURIComponent(category.name)}`,
  }));

  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Explore"
          title="Walk through the showroom."
          subtitle="Hover a panel — or tap it on mobile — to bring a category forward before you commit to a click."
        />

        <Reveal className="mt-14">
          <AccordionGallery
            items={items}
            defaultIndex={2}
            expandRatio={0.52}
            trigger="hover"
            height={480}
          />
        </Reveal>
      </div>
    </section>
  );
}

export default RoomGallery;
