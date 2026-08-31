import { useEffect, useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { generalWhatsappLink, siteConfig, telLink } from '@/config/siteConfig';

/**
 * Persistent enquiry affordance.
 * Appears after the hero so it never competes with the first screen,
 * and expands into a two-action cluster (WhatsApp + call) on tap.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 transition-all duration-500 ease-premium sm:bottom-7 sm:right-7',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      )}
    >
      {/* Expanded actions */}
      <div
        className={cn(
          'flex flex-col items-end gap-2.5 transition-all duration-500 ease-premium',
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        )}
      >
        <a
          href={generalWhatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-full bg-white py-3 pl-5 pr-3 shadow-lift transition-colors duration-300 hover:bg-ivory"
        >
          <span className="text-xs font-medium tracking-tight text-navy">Chat on WhatsApp</span>
          <span className="flex size-9 items-center justify-center rounded-full bg-[#1B6E45] text-white">
            <MessageCircle className="size-4" />
          </span>
        </a>

        <a
          href={telLink}
          className="flex items-center gap-3 rounded-full bg-white py-3 pl-5 pr-3 shadow-lift transition-colors duration-300 hover:bg-ivory"
        >
          <span className="text-xs font-medium tracking-tight text-navy">{siteConfig.PHONE}</span>
          <span className="flex size-9 items-center justify-center rounded-full bg-navy text-ivory">
            <Phone className="size-4" />
          </span>
        </a>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        className={cn(
          'flex size-14 items-center justify-center rounded-full shadow-lift transition-all duration-500 ease-premium hover:scale-105',
          open ? 'bg-navy text-ivory' : 'bg-crimson text-white'
        )}
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}

export default WhatsAppButton;
