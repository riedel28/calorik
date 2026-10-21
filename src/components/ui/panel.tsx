import { type ReactNode, useId } from 'react';

import { cn } from '@/lib/utils';

interface PanelProps {
  /** Shown on the right of the title row. */
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  title: string;
}

/** Titled card section; the title labels the section for assistive tech. */
export const Panel = ({ aside, children, className, title }: PanelProps) => {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={cn('flex flex-col gap-[18px] rounded-xl border bg-card p-5', className)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-semibold text-[17px]" id={titleId}>
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
};
