import { useId, useRef, useState, type KeyboardEvent } from 'react';

interface Category {
  id: string;
  label: string;
  items: string[];
}

interface Props {
  /** Nom accessible de la liste d'onglets. */
  label: string;
  categories: Category[];
}

/**
 * Boîte à outils techniques en onglets (motif ARIA « tabs », flèches du clavier).
 * Sans JavaScript, le rendu serveur affiche la première catégorie.
 */
export default function TechStack({ label, categories }: Props) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const select = (index: number) => {
    const next = (index + categories.length) % categories.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(active + 1),
      ArrowDown: () => select(active + 1),
      ArrowLeft: () => select(active - 1),
      ArrowUp: () => select(active - 1),
      Home: () => select(0),
      End: () => select(categories.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  const current = categories[active];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {categories.map((category, index) => {
          const selected = index === active;
          return (
            <button
              key={category.id}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              id={`${uid}-tab-${category.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={`group flex shrink-0 items-center justify-between gap-4 rounded-lg border px-5 py-4 text-left font-display text-sm font-semibold transition-colors md:text-base ${
                selected
                  ? 'border-accent-300/50 bg-accent-500/15 text-white'
                  : 'border-brand-300/15 text-brand-100/75 hover:border-brand-300/40 hover:text-white'
              }`}
            >
              {category.label}
              <span
                className={`hidden font-mono text-xs lg:inline ${selected ? 'text-accent-300' : 'text-brand-100/40'}`}
                aria-hidden="true"
              >
                {String(category.items.length).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${current?.id}`}
        tabIndex={0}
        className="rounded-xl border border-brand-300/15 bg-night-900/50 p-6 md:p-8 lg:col-span-8"
      >
        <ul className="flex flex-wrap gap-3" key={current?.id}>
          {current?.items.map((item, index) => (
            <li
              key={item}
              className="tech-chip rounded-md border border-brand-300/25 bg-night-800 px-4 py-2.5 font-mono text-sm text-brand-100"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <span className="mr-2 text-accent-300" aria-hidden="true">
                {'>'}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
