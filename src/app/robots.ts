import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/moments/studio-dae-admin'],
    },
    sitemap: 'https://daeroom.my.id/sitemap.xml',
  };
}
