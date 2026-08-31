import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge does not know about the custom font sizes declared in
 * tailwind.config.js, so it classifies `text-section` as a text COLOUR and
 * silently drops it when merged with `text-navy`. Registering them here
 * keeps size and colour in separate conflict groups.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'section', 'stat', 'label'] }],
      'font-family': [{ font: ['display', 'sans'] }],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
