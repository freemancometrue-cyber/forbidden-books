import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
import { SITE_CONFIG } from '@/lib/constants';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: SITE_CONFIG.navTitle,
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  githubUrl: SITE_CONFIG.url,
  links: [],
};
