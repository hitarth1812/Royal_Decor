import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, MessageCircle, Phone, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/Logo';
import { GlassSurface } from '@/components/GlassSurface';
import { useScrolled } from '@/hooks/useReveal';
import { generalWhatsappLink, siteConfig, telLink } from '@/config/siteConfig';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/collection' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Showroom', to: '/showroom' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const scrolled = useScrolled(32);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile sheet whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium',
        scrolled ? 'pt-2 md:pt-3' : 'pt-4 md:pt-6'
      )}
    >
      <div className="shell">
        <GlassSurface
          as="nav"
          aria-label="Primary"
          borderRadius={999}
          blur={16}
          brightness={64}
          distortionScale={-110}
          greenOffset={10}
          blueOffset={18}
          backgroundOpacity={0.5}
          // Before the page scrolls the nav sits on flat background, so the
          // glass is switched off entirely rather than faked.
          enabled={scrolled}
          className={cn(
            'flex items-center justify-between transition-all duration-500 ease-premium',
            scrolled
              ? 'py-2 pl-5 pr-2 shadow-nav md:pl-7 md:pr-2.5'
              : 'border-transparent py-3 pl-1 pr-1 md:pl-2'
          )}
        >
          <Logo variant="compact" size={scrolled ? 'sm' : 'default'} />

          {/* --- Desktop links --- */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative rounded-full px-4 py-2 text-[0.8125rem] font-medium tracking-tight transition-colors duration-300',
                      isActive
                        ? 'text-crimson'
                        : 'text-navy/70 hover:text-navy'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={cn(
                          'absolute inset-x-4 -bottom-0.5 h-px origin-left bg-crimson transition-transform duration-500 ease-premium',
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* --- Desktop CTA --- */}
          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="ghost" size="icon" aria-label={`Call ${siteConfig.SHOWROOM_NAME}`}>
              <a href={telLink}>
                <Phone />
              </a>
            </Button>
            <Button asChild size={scrolled ? 'sm' : 'default'}>
              <Link to="/showroom">
                Visit Showroom
                <ArrowUpRight className="transition-transform duration-500 ease-premium group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </Button>
          </div>

          {/* --- Mobile trigger --- */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  'flex size-11 items-center justify-center rounded-full border border-navy/12 transition-colors duration-300 hover:bg-navy hover:text-ivory lg:hidden',
                  !scrolled && 'glass'
                )}
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full border-none bg-navy p-0 text-ivory sm:max-w-md [&>button]:hidden"
            >
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>

              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between px-6 pt-6">
                  <Logo light size="default" />
                  <SheetClose asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="flex size-11 items-center justify-center rounded-full border border-white/15 text-ivory transition-colors duration-300 hover:bg-ivory hover:text-navy"
                    >
                      <X className="size-5" />
                    </button>
                  </SheetClose>
                </div>

                <nav className="flex-1 overflow-y-auto px-6 py-10">
                  <ul className="space-y-1">
                    {navLinks.map((link, i) => (
                      <li
                        key={link.to}
                        className="animate-fade-up"
                        style={{ animationDelay: `${80 + i * 55}ms` }}
                      >
                        <NavLink
                          to={link.to}
                          end={link.to === '/'}
                          className={({ isActive }) =>
                            cn(
                              'flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-[2rem] font-light tracking-editorial transition-colors duration-300',
                              isActive ? 'text-crimson-light' : 'text-ivory hover:text-crimson-light'
                            )
                          }
                        >
                          <span className="font-sans label-xs tracking-label text-ivory/40">
                            0{i + 1}
                          </span>
                          {link.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="space-y-3 border-t border-white/10 px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                  <Button asChild variant="accent" size="lg" className="w-full">
                    <a href={generalWhatsappLink()} target="_blank" rel="noreferrer">
                      <MessageCircle />
                      Enquire on WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outlineLight" size="lg" className="w-full">
                    <a href={telLink}>
                      <Phone />
                      {siteConfig.PHONE}
                    </a>
                  </Button>
                  <p className="pt-1 text-center text-xs text-ivory/50">
                    {siteConfig.OPENING_HOURS_SHORT}
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </GlassSurface>
      </div>
    </header>
  );
}

export default Navbar;
