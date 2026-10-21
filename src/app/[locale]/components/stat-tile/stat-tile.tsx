import { cn } from '@/lib/utils';

interface StatTileProps {
  /** Background class for non-highlighted tiles. */
  className?: string;
  /** Solid primary tile for the headline number. */
  highlighted?: boolean;
  label: string;
  size?: 'md' | 'lg';
  sub: string;
  value: string;
}

export const StatTile = ({
  className = 'bg-secondary',
  highlighted = false,
  label,
  size = 'lg',
  sub,
  value,
}: StatTileProps) => (
  <div
    className={cn(
      'flex flex-col gap-1 rounded-lg px-3.5 py-3',
      highlighted ? 'bg-primary text-primary-foreground' : className,
    )}
  >
    <span className={cn('font-semibold text-xs', !highlighted && 'text-muted-foreground')}>
      {label}
    </span>
    <span
      className={cn(
        'font-bold tabular-nums',
        size === 'lg' ? 'text-[22px] tracking-[-0.01em]' : 'text-lg',
      )}
    >
      {value}
    </span>
    <span className={cn('text-xs', highlighted ? 'font-medium' : 'text-muted-foreground')}>
      {sub}
    </span>
  </div>
);
