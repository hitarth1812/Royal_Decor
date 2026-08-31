import { CategoryCard } from '@/components/CategoryCard';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { categories } from '@/data/products';

export function CategorySection() {
  return (
    <section id="collection" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Collections"
          title="Explore the collection"
          subtitle="Six lines of work, from the window to the floor — most of it measured, made and fitted by our own team."
          action="View all products"
          actionTo="/products"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {categories.map((category, i) => (
            <Reveal key={category.id} delay={i * 90} className="h-full">
              <CategoryCard category={category} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
