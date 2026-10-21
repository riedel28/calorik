import { Radio } from '@base-ui/react/radio';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

const focusRing =
  'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring';

/** Full-width selectable card: label, description and optional trailing content. */
function OptionRadio({ className, ...props }: ComponentProps<typeof Radio.Root>) {
  return (
    <Radio.Root
      className={cn(
        'group flex min-h-[46px] cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2 text-left transition-colors hover:border-border-strong data-checked:border-primary data-checked:bg-accent data-checked:hover:border-primary',
        focusRing,
        className,
      )}
      {...props}
    />
  );
}

function OptionText({ description, label }: { description?: string; label: string }) {
  return (
    <span className="flex flex-1 flex-col gap-0.5">
      <span className="font-semibold text-[15px]">{label}</span>
      {description && <span className="text-[13px] text-muted-foreground">{description}</span>}
    </span>
  );
}

function OptionDot() {
  return (
    <span
      aria-hidden="true"
      className="flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 border-border-strong group-data-checked:border-primary"
    >
      <span className="size-2 rounded-full group-data-checked:bg-primary" />
    </span>
  );
}

/** Pill inside a segmented control (`bg-secondary p-1` track). */
function SegmentRadio({ className, ...props }: ComponentProps<typeof Radio.Root>) {
  return (
    <Radio.Root
      className={cn(
        'flex h-11 cursor-pointer items-center justify-center rounded-[9px] font-semibold text-[15px] text-muted-foreground transition-colors data-checked:bg-card data-checked:text-foreground data-checked:shadow-[0_1px_2px_rgba(16,24,40,0.08)] dark:data-checked:shadow-none',
        focusRing,
        className,
      )}
      {...props}
    />
  );
}

export { OptionDot, OptionRadio, OptionText, SegmentRadio };
