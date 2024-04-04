import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';

let headers = { 'accept-language': 'en-US,en;q=0.5' };
let languages = new Negotiator({ headers }).languages();
let locales = ['en-US', 'de-DE', 'ru-RU'];
let defaultLocale = 'en-US';

match(languages, locales, defaultLocale); // -> 'en-US'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === '/') {
    return NextResponse.rewrite(new URL('/en', request.url));
  }
}
