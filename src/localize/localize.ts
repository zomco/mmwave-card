import en from './languages/en.json';
import zhHans from './languages/zh-Hans.json';

const languages: Record<string, typeof en> = { en, 'zh-Hans': zhHans };

export function localize(key: string, lang?: string): string {
  const language = lang ?? navigator.language?.split('-')[0] ?? 'en';
  const dict =
    languages[lang ?? ''] ?? Object.entries(languages).find(([k]) => k.startsWith(language))?.[1] ?? languages['en'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let r: any = dict;
  for (const k of key.split('.')) {
    r = r?.[k];
    if (r === undefined) break;
  }
  return typeof r === 'string' ? r : key;
}
