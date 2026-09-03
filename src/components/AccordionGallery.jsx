import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * A row of panels that expand toward whichever one is active — hover
 * (or focus, or arrow keys) to bring one forward; the rest recede and
 * mute to grayscale. Ported from React Bits' AccordionGallery; the
 * GSAP timeline it shipped with is replaced by plain CSS transitions
 * on `flex-grow`/`transform` (see `.ag-panel` in global.css) so the
 * site doesn't take on a new animation dependency for one section.
 */
export function AccordionGallery({
  items,
  defaultIndex = 0,
  expandRatio = 0.52,
  height = 460,
  trigger = 'hover',
  showLabels = true,
  className = '',
}) {
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
  const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;

  // Touch collapses hover+focus+click into one gesture, so the
  // preview-then-confirm dance below only makes sense on devices that
  // can actually hover. Everywhere else, a tap just navigates.
  const canHover = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const handleEnter = (i) => {
    if (trigger === 'hover' && canHover()) setActive(i);
  };

  const handleFocus = (i) => {
    if (canHover()) setActive(i);
  };

  const handleClick = (i, e) => {
    if (canHover() && i !== active) {
      e.preventDefault();
      setActive(i);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <div
      className={`accordion-gallery ${className}`.trim()}
      style={{ height: `${height}px` }}
      role="list"
      aria-label="Showroom gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const rot = isActive ? 0 : i < active ? 8 : -8;
        const Tag = item.link ? Link : 'div';

        return (
          <Tag
            key={item.label}
            to={item.link}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{ flexGrow: isActive ? grow : 1, transform: `rotateY(${rot}deg)` }}
            onClick={(e) => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => handleFocus(i)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span className="ag-panel__media">
                <img src={item.image} alt={item.alt || item.label} draggable="false" loading="lazy" />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            {showLabels ? (
              <span className="ag-panel__label" aria-hidden="true">
                <span className="ag-panel__bar" />
                <span className="ag-panel__text">{item.label}</span>
              </span>
            ) : null}
          </Tag>
        );
      })}
    </div>
  );
}

export default AccordionGallery;
