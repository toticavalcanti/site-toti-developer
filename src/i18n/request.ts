import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    return {
      locale: routing.defaultLocale,
      messages: (await import(`../../messages/${routing.defaultLocale}.json`)).default
    };
  }

  // Debug: console.log(`Loading messages for locale: ${locale}`);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
