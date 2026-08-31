import { useState } from 'react';
import { Check, MessageCircle, Send } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mailLink, siteConfig, whatsappLink } from '@/config/siteConfig';
import { products } from '@/data/products';

const fieldClass =
  'h-12 rounded-2xl border-navy/12 bg-white px-4 text-sm text-navy shadow-none placeholder:text-navy/30 focus-visible:ring-crimson/50';

/**
 * Enquiry form.
 *
 * There is no backend by design. The submission is composed into a
 * message and routed by siteConfig.ENQUIRY_METHOD:
 *   'whatsapp' → opens wa.me with the enquiry pre-filled  (default)
 *   'mailto'   → opens the visitor's mail client
 *   'endpoint' → POSTs to siteConfig.ENQUIRY_ENDPOINT (Formspree etc.)
 * Adding a real endpoint later means changing one config value.
 */
export function EnquiryForm({ defaultProduct = '', className, compact = false }) {
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    product: defaultProduct,
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const set = (key) => (e) => {
    const value = e?.target ? e.target.value : e;
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please tell us your name.';
    if (!values.phone.trim()) next.phone = 'A phone number lets us reply quickly.';
    else if (!/^[\d\s+()-]{7,}$/.test(values.phone.trim())) next.phone = 'That does not look like a phone number.';
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = 'Please check the email address.';
    if (!values.message.trim()) next.message = 'A short note helps us prepare.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const composeMessage = () =>
    [
      `New enquiry for ${siteConfig.SHOWROOM_NAME}`,
      '',
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      values.email ? `Email: ${values.email}` : null,
      values.product ? `Product of interest: ${values.product}` : null,
      '',
      values.message,
    ]
      .filter(Boolean)
      .join('\n');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    const body = composeMessage();

    try {
      if (siteConfig.ENQUIRY_METHOD === 'endpoint' && siteConfig.ENQUIRY_ENDPOINT) {
        await fetch(siteConfig.ENQUIRY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
      } else if (siteConfig.ENQUIRY_METHOD === 'mailto') {
        window.location.href = `${mailLink}?subject=${encodeURIComponent(
          `Enquiry from ${values.name}`
        )}&body=${encodeURIComponent(body)}`;
      } else {
        window.open(whatsappLink(body), '_blank', 'noopener');
      }
      setStatus('sent');
    } catch {
      // Whatever happens to the transport, the visitor still gets a route out.
      window.open(whatsappLink(body), '_blank', 'noopener');
      setStatus('sent');
    }
  };

  if (status === 'sent') {
    return (
      <div
        className={cn(
          'flex flex-col items-center rounded-panel border border-navy/10 bg-ivory-warm px-6 py-16 text-center',
          className
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-crimson text-white">
          <Check className="size-6" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-light tracking-editorial text-navy">
          Thank you — your enquiry is on its way.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          If the message window did not open, reach us directly on WhatsApp or call
          the showroom. We usually reply within a few hours during opening times.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="whatsapp" asChild>
            <a href={whatsappLink(composeMessage())} target="_blank" rel="noreferrer">
              <MessageCircle />
              Open WhatsApp
            </a>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setValues({ name: '', phone: '', email: '', product: defaultProduct, message: '' });
              setStatus('idle');
            }}
          >
            Send another enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('space-y-5', className)}>
      <div className={cn('grid gap-5', !compact && 'sm:grid-cols-2')}>
        <div className="space-y-2">
          <Label htmlFor="enquiry-name" className="text-[0.625rem] uppercase tracking-label text-muted-foreground">
            Name *
          </Label>
          <Input
            id="enquiry-name"
            value={values.name}
            onChange={set('name')}
            placeholder="Your full name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={cn(fieldClass, errors.name && 'border-destructive')}
          />
          {errors.name ? <p className="text-xs text-destructive">{errors.name}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="enquiry-phone" className="text-[0.625rem] uppercase tracking-label text-muted-foreground">
            Phone *
          </Label>
          <Input
            id="enquiry-phone"
            type="tel"
            inputMode="tel"
            value={values.phone}
            onChange={set('phone')}
            placeholder="+91 00000 00000"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            className={cn(fieldClass, errors.phone && 'border-destructive')}
          />
          {errors.phone ? <p className="text-xs text-destructive">{errors.phone}</p> : null}
        </div>
      </div>

      <div className={cn('grid gap-5', !compact && 'sm:grid-cols-2')}>
        <div className="space-y-2">
          <Label htmlFor="enquiry-email" className="text-[0.625rem] uppercase tracking-label text-muted-foreground">
            Email
          </Label>
          <Input
            id="enquiry-email"
            type="email"
            value={values.email}
            onChange={set('email')}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={cn(fieldClass, errors.email && 'border-destructive')}
          />
          {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
        </div>

        <div className="space-y-2">
          <Label className="text-[0.625rem] uppercase tracking-label text-muted-foreground">
            Product interest
          </Label>
          <Select value={values.product} onValueChange={set('product')}>
            <SelectTrigger className={cn(fieldClass, 'w-full')}>
              <SelectValue placeholder="Select a piece (optional)" />
            </SelectTrigger>
            <SelectContent className="max-h-72 rounded-2xl border-navy/10">
              <SelectItem value="General enquiry" className="rounded-lg text-sm">
                General enquiry
              </SelectItem>
              {products.map((product) => (
                <SelectItem
                  key={product.id}
                  value={`${product.name} (${product.productCode})`}
                  className="rounded-lg text-sm"
                >
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="enquiry-message" className="text-[0.625rem] uppercase tracking-label text-muted-foreground">
          Message *
        </Label>
        <Textarea
          id="enquiry-message"
          rows={5}
          value={values.message}
          onChange={set('message')}
          placeholder="Tell us what you are looking for, the room it is for, or a good time to visit."
          aria-invalid={Boolean(errors.message)}
          className={cn(
            'rounded-2xl border-navy/12 bg-white px-4 py-3.5 text-sm text-navy shadow-none placeholder:text-navy/30 focus-visible:ring-crimson/50',
            errors.message && 'border-destructive'
          )}
        />
        {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : null}
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
          <Send className="group-hover/btn:translate-x-0.5" />
        </Button>

        <p className="text-xs leading-relaxed text-muted-foreground">
          Sent straight to the showroom on WhatsApp. We never share your details.
        </p>
      </div>
    </form>
  );
}

export default EnquiryForm;
