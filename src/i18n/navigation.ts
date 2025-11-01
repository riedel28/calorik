import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, usePathname } = createNavigation(routing);
