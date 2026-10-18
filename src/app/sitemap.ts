import type {MetadataRoute} from 'next';
import {business,href,locales,pages} from '@/lib/site';
export const dynamic = 'force-static';
export default function sitemap():MetadataRoute.Sitemap{return locales.flatMap(l=>pages.map(p=>({url:business.url+href(l,p),alternates:{languages:{...Object.fromEntries(locales.map(language=>[language,business.url+href(language,p)])),'x-default':business.url+href('en',p)}}})));}
