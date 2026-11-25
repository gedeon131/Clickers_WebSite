import { useEffect, useState } from 'react';

interface Props {
  /** Description de l'illustration pour les lecteurs d'écran. */
  label: string;
  command: string;
  steps: string[];
  done: string;
}

/**
 * Terminal animé du hero : une idée passe par les étapes de la méthode Clickers
 * jusqu'à la mise en ligne. Rendu complet côté serveur (sans JavaScript ou avec
 * « réduire les animations »), animé une fois à l'affichage sinon.
 */
export default function HeroTerminal({ label, command, steps, done }: Props) {
  const total = steps.length + 1;
  const [typed, setTyped] = useState(command.length);
  const [shown, setShown] = useState(total);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setTyped(0);
    setShown(0);
    let chars = 0;
    let lines = 0;
    let timer: number;
    const typeNext = () => {
      chars += 1;
      setTyped(chars);
      timer = window.setTimeout(chars < command.length ? typeNext : showNext, chars < command.length ? 38 : 420);
    };
    const showNext = () => {
      lines += 1;
      setShown(lines);
      if (lines < total) timer = window.setTimeout(showNext, 480);
    };
    timer = window.setTimeout(typeNext, 500);
    return () => window.clearTimeout(timer);
  }, [command, total]);

  const progress = Math.round((Math.min(shown, steps.length) / steps.length) * 100);
  const finished = shown >= total;

  return (
    <figure
      role="img"
      aria-label={label}
      className="relative overflow-hidden rounded-xl border border-brand-300/20 bg-night-800/80 font-mono text-[0.8125rem] shadow-2xl shadow-brand-700/30 backdrop-blur md:text-sm"
    >
      <div className="flex items-center gap-2 border-b border-brand-300/15 px-4 py-3" aria-hidden="true">
        <span className="size-3 rounded-full bg-red-400" />
        <span className="size-3 rounded-full bg-amber-400" />
        <span className="size-3 rounded-full bg-green-500" />
        <span className="ml-3 text-xs text-brand-100/50">clickers-community — ~/projets</span>
      </div>

      <div className="space-y-2.5 px-5 py-6 text-brand-100/90 md:px-6" aria-hidden="true">
        <p className="break-words">
          <span className="text-accent-300">$ </span>
          {command.slice(0, typed)}
          {typed < command.length && <span className="ml-px inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-brand-300" />}
        </p>

        {steps.map((step, index) => (
          <p
            key={step}
            className={`flex items-center gap-3 transition-all duration-300 ${index < shown ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}
          >
            <span className="text-success-300">✓</span>
            <span className="flex-1">{step}</span>
            <span className="text-brand-100/40">{String(index + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}</span>
          </p>
        ))}

        <p className={`pt-2 font-semibold transition-opacity duration-500 ${finished ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-gradient">→ {done}</span>
        </p>
      </div>

      <div className="h-1 bg-night-900/60" aria-hidden="true">
        <div
          className="h-full bg-linear-to-r from-brand-500 to-accent-500 transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </figure>
  );
}
